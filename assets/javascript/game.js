

let timeLimit = 10;
let numCorrect = 0;
let numIncorrect = 0;

const Q1 = {query:"What relic of Jurgen Windcaller's did the Dovahkiin seek?", choices:["An axe","A horn","A shield","A cloak"], answer: "A horn"};
const Q2 = {query:"?", choices:["","","",""], answer: ""};
const Q3 = {query:"?", choices:["","","",""], answer: ""};
const Q4 = {query:"?", choices:["","","",""], answer: ""};
const Q5 = {query:"?", choices:["","","",""], answer: ""};
const Q6 = {query:"?", choices:["","","",""], answer: ""};
const Q7 = {query:"?", choices:["","","",""], answer: ""};
const Q8 = {query:"?", choices:["","","",""], answer: ""};
const Q9 = {query:"?", choices:["","","",""], answer: ""};
const Q10 = {query:"?", choices:["","","",""], answer: ""};
const Q11 = {query:"?", choices:["","","",""], answer: ""};
const Q12 = {query:"?", choices:["","","",""], answer: ""};
const Q13 = {query:"?", choices:["","","",""], answer: ""};
const Q14 = {query:"?", choices:["","","",""], answer: ""};
const Q15 = {query:"?", choices:["","","",""], answer: ""};
const Q16 = {query:"?", choices:["","","",""], answer: ""};
const Q17 = {query:"?", choices:["","","",""], answer: ""};
const Q18 = {query:"?", choices:["","","",""], answer: ""};
const Q19 = {query:"?", choices:["","","",""], answer: ""};
const Q20 = {query:"?", choices:["","","",""], answer: ""};

let questionArr = [Q1];
let questionArrIndex = 0;


$("#goButton").on("click", function() {
    console.log("button was clicked");
    gameLoop();
});

function gameLoop(){
    $("#timerCounter").text(10);
    triviaTimer = setInterval(printTime, 1000);
    printQuestions(questionArr[questionArrIndex]);

    $("#answerButtonA").on("click", function() {
        clearInterval(triviaTimer);
        checkAnswer(0);
    });

    $("#answerButtonB").on("click", function() {
        clearInterval(triviaTimer);
        checkAnswer(1);
    });

    $("#answerButtonC").on("click", function() {
        clearInterval(triviaTimer);
        checkAnswer(2);
    });

    $("#answerButtonD").on("click", function() {
        clearInterval(triviaTimer);
        checkAnswer(3);
    });
};

function checkAnswer(n) {
    if(questionArr[questionArrIndex].choices[n] === questionArr[questionArrIndex].answer) {
        console.log("correct!")
        numCorrect++;
        questionArrIndex++;
        checkForGameEnd();
    } else {
        console.log("WRONG")
        numIncorrect++;
        questionArrIndex++;
        checkForGameEnd()
    }
};

function checkForGameEnd() {
    if (questionArrIndex === questionArr.length){
        alert("The game is over! "+numCorrect+"-correct, "+numIncorrect+"-incorrect");
    }
}

function printQuestions(printQ){
    $("#activeQuestion").text(printQ.query);
    $("#answerTextA").text(printQ.choices[0]);
    $("#answerTextB").text(printQ.choices[1]);
    $("#answerTextC").text(printQ.choices[2]);
    $("#answerTextD").text(printQ.choices[3]);
    
};

function printTime() {
    if(timeLimit === 0){
        timeLimit = 10;
        clearInterval(triviaTimer);
        // $("#timerCounter").text(0);
        alert("Time's up!");
        timeUp();
    } else {
        $("#timerCounter").text(timeLimit-1);
        timeLimit--;
    }
};



