// TODO: 
// add questions, answers, fun facts, and final page




var btnStart = $("<button>").attr({"class":"btn btn-default"});
var initialTimer = 30;
var timer;
var winCount = 0;
var lossCount = 0;
var correctCount = 0;
var incorrectCount = 0;
var questionDiv = $("<h2>");
var  answerDiv = $("<p>")
//var qText = "";
//var aText = "";
var qCount = 0;
var correctAnswer;
var userAnswer;
var timerActive = false;
var intervalId;
var activeGame = false;


var questionContent = [{
     question: "Which of the following actually exist?",
     options: ["Sasquatch", "Chupacrabra", "Jersey Devil", "Loch Ness Monster", "Mermaids"],
     answer: 'Sasquatch',
     userAnswer: '',
     correct: false
},
{
    question: "Question two?",
    options: ["correct2", "inc2.1", "inc2.2", "inc2.3", "inc2.4"],
    answer: 'correct2',
    userAnswer: '',
    correct: false
} ]

window.onload = function() {
// load initial timer
var convertedTimer = convertTime(initialTimer)
$("#timer").html(convertedTimer)

// load initial score
updateScoreboard();

// load start button
btnStart.text("Start Game");
answerDiv.html("<br>Hint: For a real challenge, click the timer before starting the game!")
$("#content").append(btnStart, answerDiv);

// click events for timer and start button
$("#timer").on("click", function(){
    adjustTimer();
})
btnStart.on("click", function(){
    startGame();
})
}


// adjusts timer on click on start screen
function adjustTimer(){
    if(!activeGame){
        if(initialTimer > 0){
            initialTimer -= 5;
        } else {
            initialTimer = 30;
        }  
        var convertedTimer = convertTime(initialTimer)
        $("#timer").html(convertedTimer)
    } 
}

// starts the game
function startGame(){
    activeGame = true;
    //shuffle questions
    questionContent = shuffle(questionContent)
    //display question
   nextQuestion()
}

function nextQuestion(){
    // Shuffle options, clear answerDiv
    var shuffledOptions = shuffle(questionContent[qCount].options)
    answerDiv.text("");
    // Save correct answer to global for easier access
    correctAnswer = questionContent[qCount].answer
    // Populate question text
    questionDiv.text(questionContent[qCount].question)
    $("#content").html(questionDiv);
    $("#title").html("Question " + (qCount + 1))
    // Populate options as buttons
    for(var i = 0; i < shuffledOptions.length; i++){
        $("<button>")
        .attr({"class": "btn btn-default ansBtn", "value": shuffledOptions[i]})
        .text(shuffledOptions[i])
        .appendTo(answerDiv)
        .click(function(){
            userAnswer = this.value;
            questionContent[qCount].userAnswer = userAnswer;
            showResult(userAnswer)
        })   
    }
    
    $("#content").append(answerDiv);
    startTimer(initialTimer); 
    }
    
  // shuffles and returns shuffled array  
function shuffle(array){
    for(i = 0; i < array.length; i++){
        var j = Math.floor(Math.random() * array.length)
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array; 
} 

function showResult(userAnswer){
    var message;
    if(timerActive){
        stopTimer();
        if(userAnswer == correctAnswer){
            questionDiv.text("Correct!")
            message = "You got it! " + userAnswer + " is the correct answer!";
            correctCount++
            questionContent[qCount].correct = true;
        } else {
            questionDiv.text("Wrong!");
            message = "Your Answer: " + userAnswer + "<br>" + "Correct Answer: " + correctAnswer;
            incorrectCount++
        }
    } else {
        questionDiv.text("Time's Up!")
        message = "The Correct Answer was " + correctAnswer;
        incorrectCount++
    }

    $("#content").html(questionDiv);
    $(answerDiv).html(message).appendTo("#content");
    qCount++
    updateScoreboard();
    if(activeGame){
    setTimeout(nextQuestion, 3000)
    } else {
        setTimeout(gameOver, 3000)
    }
}


function startTimer(startValue){
    if(!timerActive){
        timer = startValue + 1;
        intervalId = setInterval(timerCountdown, 1000)
        timerActive = true;
    }
}

function stopTimer(){
    clearInterval(intervalId);
    timerActive = false;
    $("#timer").html("00:00") 
}

function timerCountdown(){
        timer--
        var convertedTimer = convertTime(timer)
        $("#timer").html(convertedTimer)
        if(timer === 0){
            stopTimer();
            userAnswer = "";
            showResult(userAnswer)
        }
}

function convertTime(t){
    if(t < 10){
        t = "00:0" + t
    } else {
        t = "00:" + t
    }
    return t;
}

function updateScoreboard(){
    $("#scoreboard-left").html("0" + correctCount);
    $("#scoreboard-right").html("0" + incorrectCount);
    if(qCount + 1 == questoinContent.length){
        activeGame = false;
    }
// var score = correctCount + " / " + qCount
// var percent = (Math.round((correctCount/qCount) * 100)) + "%"
}

function gameOver(){

}
