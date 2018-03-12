var btnStart = $("<button>").attr({"class":"btn btn-default"});
var initialTimer = 30;
var timer;
var winCount = 0;
var lossCount = 0;
var correctCount = 0;
var incorrectCount = 0;
var question = $("<h2>");
var  answerDiv = $("<div>")
var qText = "";
var aText = "";
var qCount = 0;
var correctAnswer = "";
var timerActive = false;
var intervalId;

window.onload = function() {
btnStart.text("Start Game");
$("#content").append(btnStart);
btnStart.on("click", function(){
    startGame();
})

}

var questions = ["Which of the following actually exist?", "question2", "question3"]
var incorrect1 = ["Chupacrabra", "Jersey Devil", "Loch Ness Monster", "Mermaids"]
var incorrect2 = ["inc2.1", "inc2.2", "inc2.3", "inc2.4"]
var allIncorrect = [incorrect1, incorrect2]
var correctAns = ["Sasquatch", "Correct2", "Correct3"]

function startGame(){
   nextQuestion()
}

function nextQuestion(){
    qText = questions[qCount];
    correctAnswer = correctAns[qCount];
    var ansArr = shuffleAnswers(allIncorrect[qCount])
    answerDiv.text("")
    question.text(questions[qCount]);
    $("#content").html(question);
    for(var i = 0; i < ansArr.length; i++){
        $("<button>")
        .attr({"class": "btn btn-default ansBtn", "value": ansArr[i]})
        .text(ansArr[i])
        .appendTo(answerDiv)
        .click(function(){
            var userAnswer = this.value;
            processGuess(userAnswer)
        })
        $(answerDiv).append("<p>")   
    }
    
    $("#content").append(answerDiv);
    startTimer(initialTimer);
    
    
    }
    
    
function shuffleAnswers(array){
    array.push(correctAnswer);
    for(i = 0; i < array.length; i++){
        var j = Math.floor(Math.random() * array.length)
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array;
}

function processGuess(userAnswer){
    stopTimer();
    
    if(userAnswer == correctAnswer){
     //   alert("Correct!")
        $("#content").html("Correct!");
        $(answerDiv).text("You got it! " + userAnswer + " is the correct answer!")
        $("#content").append(answerDiv);
    } else {
     //   $("#content").html("Wrong!");
    //    $(answerDiv).text("Nope, that's incorrect.")
    //    $(answerDiv).append("Your Answer: " + userAnswer);
     //   $(answerDiv).append("Correct Answer: " + correctAns); */
      //  alert(userAnswer + " " + correctAnswer)
    }
    startTimer(4)
    qCount++
    // TODO: while timer is active, display page, otherwise go to nextquestion

    
}

function showAnswer(result){

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
    
}

function timerCountdown(){
        timer--
        $("#timer").text(timer)
        if(timer === 0){
            stopTimer();
        }
}
