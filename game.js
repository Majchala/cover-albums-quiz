import questions from './questions.js';

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let loaderWrapper = document.getElementsByClassName("loader-wrapper");
let loader = document.getElementsByClassName("loader");
let inner = document.getElementsByClassName("loader-inner");
let wrapper = document.getElementById("wrapper");
const imageContainer = document.getElementById("image-container")



setTimeout(() => {
    wrapper.style.visibility = 'hidden';
}, 1500);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [...questions];


// QUESTIONS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 15;

//celkově 31 otázek

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();

}

const getNewQuestion = () => {

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
    question.innerHTML = currentQuestion.question;

        if (currentQuestion.image) {
        imageContainer.innerHTML = `<img src="${currentQuestion.image}" alt="Obrázek">`;
    } else {
        imageContainer.innerHTML = ''; // Pokud není obrázek, vymažeme obsah kontejneru
    }



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

         // obarvení celého rodiče podle správnosti odpovědi
        selectedChoice.parentElement.classList.add(classToApply);
        
    
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        if (classToApply === "incorrect") {
            const correctAnswer = currentQuestion.answer;
            choices[correctAnswer - 1].parentElement.classList.add('correct');
        }




        

       
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            if (classToApply === "incorrect") {
                choices[currentQuestion.answer - 1].parentElement.classList.remove('correct');
            }
            getNewQuestion();
        }, 1000);
    });
});

    const incrementScore = num => {
        score += num;
        scoreText.innerText = score;

    }



startGame()