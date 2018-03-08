const timePerQuestion = 10;
var currentQuestionTime;
var score = 0;
var numberQuestion;
var totalTime;
var numCurrent = 0;
var usedTime = 0;
var totalUsedTime = 0;
var questions = [{ q: 'aaaa1' }, { q: 'aaaa2' }, { q: 'aaaa3' }, { q: 'aaaa4' }, { q: 'aaaa5' }, { q: 'aaaa6' }, { q: 'aaaa7' }, { q: 'aaaa8' }, { q: 'aaaa9' }, { q: 'aaaa10' }]
var timer;

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

    setCountdown();
}

function setCountdown() {
    currentQuestionTime = timePerQuestion;
    document.getElementById("timer").innerHTML = currentQuestionTime + "s";
    timer = setInterval(function() {
        currentQuestionTime--;
        document.getElementById("timer").innerHTML = currentQuestionTime + "s";
        if (currentQuestionTime === 0) {
            clearInterval(timer);
            next();
        }
    }, 1000);
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
    if (numCurrent < numberQuestion - 1) {
        clearInterval(timer);
        document.getElementById("game-menu").style.display = "none";
        setTimeout(function() {
            const usedTime = timePerQuestion - currentQuestionTime;
            totalUsedTime += usedTime;
            console.log(totalUsedTime, usedTime, currentQuestionTime)
            numCurrent++;
            getQuestion();
            document.getElementById("game-menu").style.display = "block";
        }, 1000);
    } else {
        document.getElementById("game-menu").style.display = "none";
        document.getElementById("end-menu").style.display = "block";
        document.getElementById("score").innerHTML = score;
        document.getElementById("score-correct").innerHTML = score;
        document.getElementById("score-incorrect").innerHTML = numberQuestion - score;
        document.getElementById("total-time").innerHTML = totalUsedTime;
        document.getElementById("average-time").innerHTML = totalUsedTime / numberQuestion;
    }
}

function reset() {
    numberQuestion = 0;
    numCurrent = 0;
    totalTime = 0;
    score = 0;
    usedTime = 0;
    totalUsedTime = 0;
}

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