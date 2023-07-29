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
}, 3000);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


// QUESTIONS
let questions = [
    {
        image: "assets/Q13.png",
        question: "What's the name of this album?",
        choice1: 'Mr. Wonderful',
        choice2: 'Rumours',
        choice3: 'Tango in the Night',
        answer: 2,
    },
    { 
        image: "assets/Q5.png",
        question: 'This might be harder. Guess the album title.',
        choice1: 'Sticky fingers',
        choice2: 'Emotional Rescue',
        choice3: 'Black and Blue',
        answer: 1,
    },
    {
        image: 'assets/Q5.png',
        question: 'Which band released this album?',
        choice1: 'Led Zeppelin',
        choice2: 'The Who',
        choice3: 'The Rolling Stones',
        answer: 3,
    },
    {
        image: "assets/Q2.jpg",
        question: 'Ok, this one is simple:',
        choice1: 'Abby Road',
        choice2: 'Abbey Road',
        choice3: 'Abey Road',
        answer: 2,
    },
    {
        image: "assets/Q2.jpg",
        question: 'Which band released this album?',
        choice1: 'Beatles',
        choice2: 'The Strokes',
        choice3: 'Led Zeppelin',
        answer: 1,
    },
    {
        image: "assets/Q11.jpg",
        question: 'Which band released this album?',
        choice1: 'The Velvet Underground',
        choice2: 'Andy Warhol',
        choice3: 'The Velvet Underground & Nico',
        answer: 3,
    },
    {
        image: "assets/Q10.jpg",
        question: 'Which band released this album?',
        choice1: 'Joy Division',
        choice2: 'Arctic Monkeys',
        choice3: 'The Velvet Underground',
        answer: 1,
    },
    {
        image: "assets/Q11.jpg",
        question: "What's the name of this Arctic Monkeys album?",
        choice1: 'AM',
        choice2: 'Suck it and See',
        choice3: 'The Car',
        answer: 1,
    },
    {
        image: "assets/Q7.png",
        question: "Who released this album?",
        choice1: 'Bryan Adams',
        choice2: 'Lenny Kravitz',
        choice3: ' Bruce Springsteen',
        answer: 3,
    },
    {
        image: "assets/Q3.jpg",
        question: "Can you guess who released this album?",
        choice1: 'Pink Floyd',
        choice2: 'Led Zeppelin',
        choice3: 'The Who',
        answer: 2,
    },
    // -> 10 
    {
        image: "assets/Q8.png",
        question: 'Which band released this album?',
        choice1: 'The Clash',
        choice2: 'Sex Pistols',
        choice3: 'The Rolling Stones',
        answer: 1,
    },
    {
        image: "assets/Q9.png",
        question: 'What is the name of this iconic album?',
        choice1: 'Yellow Submarine',
        choice2: "A Hard Day's Night",
        choice3: "Sgt Pepper’s Lonely Hearts Club Band",
        answer: 3,
    },
    {
        image: "assets/Q4.png",
        question: 'Hey, this one is super easy: the name?',
        choice1: 'Nevermind',
        choice2: 'In Utero',
        choice3: 'Bleach',
        answer: 1,
    },
    {
        image: "assets/Q6.png",
        question: 'What is the name of this album and who released it?',
        choice1: 'Fletwood Mac - Fleetwood Mac',
        choice2: 'Beatles - The Beatles',
        choice3: 'Pink Floyd - The Wall',
        answer: 2,
    },
    {
        image: "assets/Q12.png",
        question: 'What is the name of this album and who released it?',
        choice1: 'Pink Floyd - The Division Bell',
        choice2: 'Pink Floyd - The Wall',
        choice3: 'Pink Floyd - The Dark Side of the Moon',
        answer: 3,
    },
    // -> 15 


]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 15;

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