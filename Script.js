
const questions = [
    {
        question: "Which city is known as Pink City?",
        answers: [
            { text: "Mumbai", correct: false },
            { text: "Jaipur", correct: true },
            { text: "Bangalore", correct: false },
            { text: "Agra", correct: false },
        ]
    },
    {
        question: "What is the national animal of India?",
        answers: [
            { text: "Bengal Tiger", correct: true },
            { text: "Peacock", correct: false },
            { text: "Elephant", correct: false },
            { text: "Leopard", correct: false },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ]
    },
    {
        question: "What is the chemical symbol for Gold?",
        answers: [
            { text: "Ag", correct: false },
            { text: "Au", correct: true },
            { text: "Pb", correct: false },
            { text: "Fe", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        // Set dataset attribute to check correct answer later
        button.dataset.correct = answer.correct;

        button.addEventListener("click", () => selectAnswer(button));
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(selectedButton) {
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct"); // Green for correct answer
        score++;
    } else {
        selectedButton.classList.add("wrong"); // Red for wrong answer
    }

    // Disable all buttons after selecting an answer
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct"); // Show the correct answer
        }
    });

    nextButton.style.display = "block"; // Show Next button
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    resetState();
    questionElement.innerHTML = `Quiz Completed! Your score: ${score}/${questions.length}`;
    nextButton.innerHTML = "Restart Quiz";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();