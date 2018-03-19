// Peter Anderson's Skyrim Trivia Game - 2018

// ********************************************************************************************************
// The basic function starts with a press of the Go button.  On pressing the button,
// the game state is set to active, the questions are shuffled (to keep the game fresh),
// and the core game loop function begins.  The core loop handles timer and question management,
// and creates the buttons that allow more events to be triggered.
// ********************************************************************************************************

//                                              Variables

let timeLimit = 10;
let numCorrect = 0;
let numIncorrect = 0;
let gameIsActive = 0;

let Q1 = {query:"What relic of Jurgen Windcaller's did the Dovahkiin seek?", choices:["An axe","A horn","A shield","A cloak"], answer: "A horn"};
let Q2 = {query:"Who was executed when the Dovakiin entered Solitude for the first time?", choices:["Helka","Sidgaar","Roggvir","Toki"], answer: "Roggvir"};
let Q3 = {query:"Who lives at the top of the Throat of the World?", choices:["Paarthurnax","Aldiun","Taak","Durnehviir"], answer: "Paarthurnax"};
let Q4 = {query:"What makes The Companions unique in Skyrim?", choices:["They are thieves","They are assassins","They are werewolves","They are lactos intolerant"], answer: "They are werewolves"};
let Q5 = {query:"Which word is not part of Fus Ro Dah?", choices:["Push","Balance","Force","Power"], answer: "Power"};
let Q6 = {query:"Who has wares if you have coin?", choices:["The Market Rat","Khajiit","Sidgaar the Sly","Wares tradin' Willy"], answer: "Khajiit"};
let Q7 = {query:"What was patched in Vanilla Skyrim for being too strong?", choices:["Smithing skill earned from crafting Iron daggers","Skyrim's biceps were too strong","Daedric Warhammer power attacks","Fire spread on Yor Toor Shul"], answer: "Smithing skill earned from crafting Iron daggers"};
let Q8 = {query:"Who is fighting against The Empire?", choices:["The Rebellion","The Dark Brotherhood","The Stormcloaks","The Altmer"], answer: "The Stormcloaks"};
let Q9 = {query:"What is outlawed by the White-Gold Concordat?", choices:["Thalmor owning property","Alteration magic","Owning swords","Worship of Talos"], answer: "Worship of Talos"};
let Q10 = {query:"What is not a name of Talos?", choices:["The Eighth Divine","Ysmir","Dragon of the North","Tiber Septim"], answer: "The Eighth Divine"};
let Q11 = {query:"How much do arrows weigh?", choices:["1oz","10oz","0.1oz","Nothing!"], answer: "Nothing!"};
let Q12 = {query:"Who lives in High Hrothgar?", choices:["The Grey Beards","The Snow Elves","Princess Zelda","The Freeman"], answer: "The Grey Beards"};
let Q13 = {query:"?", choices:["","","",""], answer: ""};
let Q14 = {query:"?", choices:["","","",""], answer: ""};
let Q15 = {query:"?", choices:["","","",""], answer: ""};
let Q16 = {query:"?", choices:["","","",""], answer: ""};
let Q17 = {query:"?", choices:["","","",""], answer: ""};
let Q18 = {query:"?", choices:["","","",""], answer: ""};
let Q19 = {query:"?", choices:["","","",""], answer: ""};
let Q20 = {query:"?", choices:["","","",""], answer: ""};

let questionArr = [Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12];
let questionArrIndex = 0;

// **********************************************************************************************************

// The "Go" button activates the game state, shuffles the questions, and starts the core loop

$("#goButton").on("click", function() {
    console.log("button was clicked");
    if (gameIsActive === 0) {
        gameIsActive = 1;
        questionArr = shuffle(questionArr);
        gameLoop();
    } else {
    }
});

// The game loop starts the timer, prints the box for the question to appear in,
// prints the available answers with corresponding buttons, and creates the click
// listeners.  It also shuffles the choices before printing them, keeping the 
// game a little more fresh on repeat plays.

function gameLoop(){
    $("#timerCounter").text(10);
    triviaTimer = setInterval(printTime, 1000);
    printBox();
    questionArr[questionArrIndex].choices = shuffle(questionArr[questionArrIndex].choices);
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


// This function takes the input from the chosen button, and compares its text with the
// answer in the Q# object.  Different procedures are followed depending on correct/incorrect.

function checkAnswer(n) {
    if(questionArr[questionArrIndex].choices[n] === questionArr[questionArrIndex].answer) {
        console.log("correct!")
        numCorrect++;
        questionArrIndex++;
        timeLimit = 10;
        correctAnswer();
    } else {
        console.log("WRONG")
        numIncorrect++;
        questionArrIndex++;
        timeLimit = 10;
        incorrectAnswer();
    }
};


// This function is called last in each turn order.  It checks if all questions have been asked,
// and either calls the next step in the game loop, or de-activates the game (allowing the "Go"
// button to be used again) and displays the player's score.

function checkForGameEnd() {
    if (questionArrIndex === questionArr.length){
        questionArrIndex = 0;
        gameIsActive = 0;
        $("#focusBox").html('<div class="haveFun">Game over!<br> You got '+numCorrect+' right, and '+numIncorrect+' incorrect! <br> Click "Go" to start again!</div>');
    } else {
        gameLoop();
    }
}


// This function creates the buttons and fields that the question choices will be printed on.
// It's a little... cumbersome and messy.  Dear TA: if you know of a better way to do this (use
// multiple lines to send HTML to the document?) I'd love to know about it.

function printBox(){
    console.log("printBox started")
    $("#focusBox").html('<div class="col-md-12" id="questionBox">    <h2 id="activeQuestion"></h2>    <br>    <ul>            <li><button id="answerButtonA" type="button" class="btn btn-primary">A</button>                <p id="answerTextA" class="answerText"></p>            </li>      <br>      <li><button id="answerButtonB" type="button" class="btn btn-primary">B</button>                <p id="answerTextB" class="answerText"></p>            </li>      <br>      <li><button id="answerButtonC" type="button" class="btn btn-primary">C</button>                <p id="answerTextC" class="answerText"></p>            </li>     <br>       <li><button id="answerButtonD" type="button" class="btn btn-primary">D</button>                <p id="answerTextD" class="answerText"></p>            </li>        </ul>    </div>')
}

// This shuffles arrays.  It's the Knuth-Shuffle.  Why re-invent the wheel?

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}


// This prints my questions next to buttons.  Answers and questions are only connected by 
// string content.  This abstraction makes printing these shuffled strings easy and 
// straightforward.

function printQuestions(printQ){
    $("#activeQuestion").text(printQ.query);
    $("#answerTextA").text(printQ.choices[0]);
    $("#answerTextB").text(printQ.choices[1]);
    $("#answerTextC").text(printQ.choices[2]);
    $("#answerTextD").text(printQ.choices[3]);
    
};

// These next 3 functions handle the possible cases after questions have been printed in 
// the core loop.  Correct answers, incorrect answers, and no answer given within the 
// time limit.  They increment the score counters and kick off checkForGameEnd.

function correctAnswer() {
    $("#focusBox").html('<div class="haveFun">Correct!</div>');
    setTimeout(checkForGameEnd, 2500);
}

function incorrectAnswer() {
    $("#focusBox").html('<div class="haveFun">Incorrect!<br>The correct answer was:<br>'+questionArr[questionArrIndex-1].answer+'</div>');
    setTimeout(checkForGameEnd, 4000);
}

function timeUp() {
    $("#focusBox").html('<div class="haveFun">Time is up!<br>The correct answer was:<br>'+questionArr[questionArrIndex-1].answer+'</div>');
    setTimeout(checkForGameEnd, 4000);
}


// This prints time for my timer.

function printTime() {
    if(timeLimit === 0){
        timeLimit = 10;
        clearInterval(triviaTimer);
        
        numIncorrect++;
        questionArrIndex++;

        timeUp();
    } else {
        $("#timerCounter").text(timeLimit-1);
        timeLimit--;
    }
};



