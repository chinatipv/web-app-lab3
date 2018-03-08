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

function start(n) {
    numberQuestion = n;
    totalTime = timePerQuestion * numberQuestion;
    console.log(n)
}

function next() {
    numCurrent++;
}

function reset() {
    numberQuestion = 0;
    totalTime = 0;
}