function loadQuestion(callback) {
    let requestURL = "data.json"
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'text';
    request.send();
    request.onload = function() {
        let questionsText = request.response;
        let questions = JSON.parse(questionsText);
        callback(questions);
    }
}

// loadQuestion((d) => console.log(d));
var score = 0;
var numberQuestion;
var totalTime;
var timePerQuestion = 10;
var numCurrent = 0;
var questions = [{ q: 'aaaa1' }, { q: 'aaaa2' }, { q: 'aaaa3' }, { q: 'aaaa4' }, { q: 'aaaa5' }, { q: 'aaaa6' }, { q: 'aaaa7' }, { q: 'aaaa8' }, { q: 'aaaa9' }, { q: 'aaaa10' }]

function start(n) {
    numberQuestion = n;
    totalTime = timePerQuestion * numberQuestion;
    numCurrent = 0;
    console.log("start: ", n);
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("game-menu").style.display = "block";
    getQuestion();
}

function getQuestion() {
    let question = questions[numCurrent];
    document.getElementById("question-number").innerHTML = question.q;
    for (var i = 0; i < 4; i++) {
        document.getElementById(`question-choice-${i}`).innerHTML = question.q + "  " + i;
    }
}

function select() {
    let question = questions[numCurrent];
    if (true) {
        score++;
    }
    next();
}

function hideMainMenu() {
    document.getElementById("main-menu").style.display = "none";
}

function next() {
    numCurrent++;
    getQuestion();
}

function reset() {
    numberQuestion = 0;
    totalTime = 0;
}