const questions = [
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            {text: "Jupiter", correct: true},
            {text: "Saturn", correct: false},
            {text: "Neptune", correct: false},
            {text: "Venus", correct: false}
        ]
    },
    {
        question: "What is the name of the first satellite sent into space?",
        answers: [
            {text: "Apollo", correct: false},
            {text: "Sputnik ", correct: true},
            {text: "Hubble", correct: false},
            {text: "Voyager", correct: false}
        ]
    },
    {
        question: "How many planets are in our solar system?",
        answers: [
            {text: "Six", correct: false},
            {text: "Nine", correct: false},
            {text: "Eight ", correct: true},
            {text: "Seven", correct: false}
        ]
    },
    {
        question: "What is the name of the galaxy we live in?",
        answers: [
            {text: "Andromeda", correct: false},
            {text: "The Milky Way", correct: true},
            {text: "Whirlpool", correct: false},
            {text: "Sombrero", correct: false}
        ]
    },
    {
        question: "Who was the first person to walk on the moon?",
        answers: [
            {text: "Buzz Aldrin", correct: false},
            {text: "Yuri Gagarin", correct: false},
            {text: "John Glenn", correct: false},
            {text: "Neil Armstrong", correct: true}
        ]
    },
    {
        question: "What planet is known as the Red Planet?",
        answers: [
            {text: "Mars", correct: true},
            {text: "Venus", correct: false},
            {text: "Mercury", correct: false},
            {text: "Earth", correct: false}
        ]
    },
    {
        question: "Which planet is known for its rings?",
        answers: [
            {text: "Uranus", correct: false},
            {text: "Jupiter", correct: false},
            {text: "Saturn ", correct: true},
            {text: "Venus", correct: false}
        ]
    },
    {
        question: "What celestial body orbits the Earth?",
        answers: [
            {text: "The Sun", correct: false},
            {text: "Mars", correct: false},
            {text: "Black Hole", correct: false},
            {text: "The Moon", correct: true}
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-button"); 

let index = 0;
let score = 0;

function startQuiz() {
    questionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState()
    let currentQuestion = questions[questionIndex];
    let questionNum = questionIndex + 1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button")
        answerButton.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct == "true"
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct == "true") {
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    questionIndex++;
    if (questionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (questionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
