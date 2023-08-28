const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('finalScore');
const finalText = document.getElementById('finalText');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

// Výsledek - OPRAVIT JEŠTĚ
finalScore.innerText = `You scored ${mostRecentScore} out of 150 points.`;

if (mostRecentScore <= 50) {finalText.innerHTML = '<img src="https://media.giphy.com/media/cr9vIO7NsP5cY/giphy.gif">'
+ '<p>LOL. You should listen to quality music more </p>';}
else if (mostRecentScore <= 100) {finalText.innerHTML = '<img src="https://media.giphy.com/media/VhWVAa7rUtT3xKX6Cd/giphy.gif">'
+ '<p>Not bad at all, but you still need to educate yourself</p>';}
else {finalText.innerHTML = '<img src="https://media.giphy.com/media/44gu1V41ejJni/giphy.gif">' + '<p>You are badass!</p>';}


username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value; // pokud nebude zadané username, tlačítko nebude available
});

saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value};

    // uložít se pouze 5 nejvyšších score 
    highScores.push(score);
    highScores.sort( (a,b) => b.score - a.score);
    highScores.splice(10);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("./index.html");

};

