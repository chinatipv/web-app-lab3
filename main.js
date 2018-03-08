var questions;

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);

}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

loadJSON(function(response) {
    questions = JSON.parse(response).questions;
});

const timePerQuestion = 10;
var currentQuestionTime;
var score = 0;
var numberQuestion;
var totalTime;
var numCurrent = 0;
var usedTime = 0;
var totalUsedTime = 0;
var timer;

function start(n) {
    questions = shuffle(questions);
    numberQuestion = n;
    totalTime = timePerQuestion * numberQuestion;
    numCurrent = 0;

    document.getElementById("main-menu").style.display = "none";
    document.getElementById("game-menu").style.display = "block";
    getQuestion();
}

function getQuestion() {
    let question = questions[numCurrent];
    console.log(question.image, !!question.image)
    if (!!question.image) {
        document.getElementById("question-img").style.display = "block";
        $("#question-img").attr('src', question.image);
    } else {
        document.getElementById("question-img").style.display = "none";
    }

    document.getElementById("question-number").innerHTML = question.question;
    for (var i = 0; i < 4; i++) {
        document.getElementById(`question-choice-${i}`).innerHTML = `${i+1}) ${question[i]}`;
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

function select(choice) {
    let answer = questions[numCurrent].answer;

    if (choice == answer) {
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
        document.getElementById("blocker").style.display = "block";
        setTimeout(function() {
            const usedTime = timePerQuestion - currentQuestionTime;
            totalUsedTime += usedTime;
            numCurrent++;
            getQuestion();
            document.getElementById("blocker").style.display = "none";
        }, 300);
    } else {
        document.getElementById("game-menu").style.display = "none";
        document.getElementById("end-menu").style.display = "block";
        document.getElementById("score").innerHTML = score;
        document.getElementById("score-correct").innerHTML = score;
        document.getElementById("score-incorrect").innerHTML = numberQuestion - score;
        document.getElementById("total-time").innerHTML = `${totalUsedTime}s`;
        document.getElementById("average-time").innerHTML = `${totalUsedTime / numberQuestion}s`;
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