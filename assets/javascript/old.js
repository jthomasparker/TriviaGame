var btnStart = $("<button>").attr({"class":"btn btn-default"});
var initialTimer = 30;
var timer;
var winCount = 0;
var lossCount = 0;
var correctCount = 0;
var incorrectCount = 0;
var question = $("<h2>");
var  answerDiv = $("<div>")
//var qText = "";
//var aText = "";
var qCount = 0;
var correctAnswer = "";
var userAnswer;
var timerActive = false;
var intervalId;


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
btnStart.text("Start Game");
$("#content").append(btnStart);
btnStart.on("click", function(){
    startGame();
})

}
/*
var question = ["Which of the following actually exist?", "question2", "question3"]
var incorrect1 = ["Chupacrabra", "Jersey Devil", "Loch Ness Monster", "Mermaids"]
var incorrect2 = ["inc2.1", "inc2.2", "inc2.3", "inc2.4"]
var allIncorrect = [incorrect1, incorrect2]
var correctArray = ["Sasquatch", "Correct2", "Correct3"]
*/
function startGame(){
    questionContent = shuffle(questionContent)
   nextQuestion()
}

function nextQuestion(){
    var shuffledOptions = shuffle(questionContent[qCount].options)
    answerDiv.text("");
    question.text(questionContent[qCount].question)
  /*  correctAnswer = correctArray[qCount];
    var ansArr = shuffleAnswers(allIncorrect[qCount])
    answerDiv.text("")
    question.text(questions[qCount]);
    $("#content").html(question);
    $("#title").html("Question " + (qCount + 1))
    for(var i = 0; i < ansArr.length; i++){
        $("<button>")
        .attr({"class": "btn btn-default ansBtn", "value": ansArr[i]})
        .text(ansArr[i])
        .appendTo(answerDiv)
        .click(function(){
            userAnswer = this.value;
            showResult(userAnswer)
        })
        $(answerDiv).append("<p>")   
    }
    
    $("#content").append(answerDiv);
    startTimer(initialTimer); */
    }
    
    
function shuffle(array){

   // array.push(correctAnswer);
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
        question.text("Correct!")
        message = "You got it! " + userAnswer + " is the correct answer!";
        correctCount++
        
    } else {
        question.text("Wrong!");
        message = "Your Answer: " + userAnswer + "\nCorrect Answer: " + correctAnswer;
        incorrectCount++
    }
} else {
    question.text("Time's Up!")
    message = "The Correct Answer was " + correctAns;
    incorrectCount++
}
qCount++
$("#content").html(question);
$(answerDiv).text(message).appendTo("#content");
$("#scoreboard").text("Score:<br>");
var score = correctCount + " / " + qCount
var percent = (Math.round((correctCount/qCount) * 100)) + "%"
$("#scoreboard").append(score, percent)


  setTimeout(nextQuestion, 3000)
    
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
    $("#timer").text("--")
    
}

function timerCountdown(){
        timer--
        $("#timer").html("Time Remaining:<br>")
        $("#timer").append(timer)
        if(timer === 0){
            stopTimer();
            userAnswer = "";
            showResult(userAnswer)
        }
}
