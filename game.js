const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let loaderWrapper = document.getElementsByClassName("loader-wrapper");
let loader = document.getElementsByClassName("loader");
let inner = document.getElementsByClassName("loader-inner");
let wrapper = document.getElementById("wrapper");



setTimeout(() => {
    wrapper.style.visibility = 'hidden';
}, 3000);


//setTimeout(function(){loaderWrapper.style.display = none}, 3000)
//setTimeout(function(){loader.style.display = none}, 3000)


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


// UDĚLAT IMPORT SOUBOR 
let questions = [
    {
        question: 'What is 2 + 2?',
        choice1: '5',
        choice2: '4',
        choice3: '7',
        answer: 2,
    },
    { 
        question: 'What is 2 + 7?',
        choice1: '9',
        choice2: '4',
        choice3: '7',
        answer: 1,
    },
    {
        image: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*YQgaKfVzK-YpxyT3NYqJAg.png',
        question: 'What is 0 + 2?',
        choice1: '5',
        choice2: '4',
        choice3: '2',
        answer: 3,
    },
    {
        image: "Návrh bez názvu.jpg",
        question: 'What is 2 + 56?',
        choice1: '5',
        choice2: '58',
        choice3: '7',
        answer: 2,
    },
]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();

}

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        // go to the end page
        return window.location.assign("./end.html");
    }
    questionCounter++;
    progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`;
    // updating the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    // vypsání náhodné otázky
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    // zobrazení možností k dané otázce
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    // aby se použité otázky neopakovaly
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return; // pokud to není ready, tak ignorujeme klik

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        // class pro správnou/nesprávnou odpoved
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        // obarvení celého rodiče podle správnosti odpovědi
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        });        
    })

    incrementScore = num => {
        score += num;
        scoreText.innerText = score;

    }



startGame()