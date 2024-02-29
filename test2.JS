const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Definición de la clase Question
class Question {
    constructor(question, choices, correctAnswer) {
        this.question = question;
        this.choices = choices;
        this.correctAnswer = correctAnswer;
    }

    // Método para mostrar la pregunta y las opciones
    display() {
        console.log(this.question);
        this.choices.forEach((choice, index) => {
            console.log(`${index + 1}. ${choice}`);
        });
    }

    // Método para verificar la respuesta del usuario
    checkAnswer(userAnswer) {
        return userAnswer == this.correctAnswer;
    }
}

// Función para manejar la entrada del usuario
function promptWithRetry(message, questionLength) {
    return new Promise((resolve) => {
        const promptUser = () => {
            rl.question(message, (answer) => {
                if (
                    isNaN(answer) ||
                    answer === "" ||
                    answer <= 0 ||
                    answer > questionLength
                ) {
                    console.log(
                        `Invalid input. Please enter a number between 1 and ${questionLength}.`
                    );
                    promptUser(); // Volver a preguntar
                } else {
                    resolve(answer.trim());
                }
            });
        };

        promptUser();
    });
}

// Función principal para ejecutar el quiz
async function runQuiz(quizQuestions) {
    let score = 0;
    const startTime = new Date();

    for (const question of quizQuestions) {
        console.log("\n");
        question.display();
        const userAnswer = await promptWithRetry(
            "Enter your answer number: ",
            question.choices.length
        );

        if (question.checkAnswer(userAnswer - 1)) {
            console.log("¡Correct answer!");
            score++;
        } else {
            console.log("Incorrect answer.");
        }
    }

    const endTime = new Date();
    const totalTime = (endTime - startTime) / 1000; // Convertir a segundos
    console.log(
        `\nEnd of the quiz. Total score ${score}/${quizQuestions.length}`
    );
    console.log(`Total time taken: ${totalTime} seconds`);

    rl.close();
}

// Ejemplo de uso:
const question1 = new Question(
    "What is the capital of France?",
    ["Paris", "Berlin", "Madrid", "Buenos Aires"],
    0
);
const question2 = new Question(
    "Which programming language is this quiz written in?",
    ["JavaScript", "Python", "Java"],
    0
);

const question3 = new Question(
    "What is the largest ocean on Earth?",
    ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean"],
    2
);
// Crear más preguntas si es necesario
const quizQuestions = [question1, question2, question3];

runQuiz(quizQuestions);
