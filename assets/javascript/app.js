// TODO: 
// add questions, answers, fun facts, avg time
// total wins/losses
// fix score format



// Globals
var btnStart = $("<button>").attr({"class":"btn btn-default"});
var questionDiv = $("<h2>");
var  answerDiv = $("<p>");
var initialTimer = 30;
var timer;
var time;
var totalTime = 0;
var correctCount = 0;
var incorrectCount = 0;
var qCount = 0;
var correctAnswer;
var userAnswer;
var timerActive = false;
var intervalId;
var activeGame = false;

// Q & A object array
var questionContent = [{
     question: "Which of the following actually exist?",
     options: ["Sasquatch", "Chupacrabra", "Jersey Devil", "Loch Ness Monster", "Mermaids"],
     answer: 'Sasquatch',
     userAnswer: '',
     correct: false,
     time: 0
},
{
    question: "Question two?",
    options: ["correct2", "inc2.1", "inc2.2", "inc2.3", "inc2.4"],
    answer: 'correct2',
    userAnswer: '',
    correct: false,
    time: 0
} ]



window.onload = function() {
    // load initial timer
    var convertedTimer = convertTime(initialTimer)
    $("#timer").html(convertedTimer)

    // load initial score
    updateScoreboard();

    // load start button and initial message
    btnStart.text("Start Game");
    answerDiv.html("<br>Hint: For a real challenge, click the timer before starting the game!")
    $("#content").append(btnStart, answerDiv);

    // click events for timer and start button
    btnStart.on("click", function(){
        startGame();
    })

    $("#timer").on("click", function(){
        adjustTimer();
    })
}



// adjusts timer on click at start and end screens
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



// loads the next question
function nextQuestion(){
    // start the timer
    startTimer(initialTimer);

    // Shuffle options, clear answerDiv
    var shuffledOptions = shuffle(questionContent[qCount].options);
    answerDiv.text("");

    // Save correct answer to global for easier access
    correctAnswer = questionContent[qCount].answer;

    // Populate question content
    questionDiv.text(questionContent[qCount].question);
    $("#content").html(questionDiv);
    $("#title").html("Question " + (qCount + 1) + " of " + questionContent.length);

    // create a button for each option
    for(var i = 0; i < shuffledOptions.length; i++){
        $("<button>")
        .attr({"class": "btn btn-default ansBtn", "value": shuffledOptions[i]})
        .text(shuffledOptions[i])
        .appendTo(answerDiv)
        .click(function(){
            userAnswer = this.value;
            questionContent[qCount].userAnswer = userAnswer;
            showResult(userAnswer)
        }); 
    };
    
    // populate answer buttons
    $("#content").append(answerDiv); 
};
  


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



// processes userAnswer and displays the result for 3 seconds
function showResult(userAnswer){
    var message;

    // active timer means an answer was clicked, so process answer
    if(timerActive){
        // stop that timer
        stopTimer();

        // result for a correct answer
        if(userAnswer == correctAnswer){
            questionDiv.text("Correct!");
            message = "You got it! " + userAnswer + " is the correct answer!";
            correctCount++;
            questionContent[qCount].correct = true;
        
        //result for an incorrect answer
        } else {
            questionDiv.text("Wrong!");
            message = "Your Answer: " + userAnswer + "<br>" + "Correct Answer: " + correctAnswer;
            incorrectCount++;
        }

    // function was called when timer hit 0
    } else {
        questionDiv.text("Time's Up!");
        message = "The Correct Answer was " + correctAnswer;
        incorrectCount++;
    }

    //update the time in the object
    questionContent[qCount].time = time;

    // display the results
    $("#content").html(questionDiv);
    $(answerDiv).html(message).appendTo("#content");
    qCount++
    updateScoreboard();

    // If there are questions left, go the next one; 
    //otherwise, go to the end screen
    if(activeGame){
    setTimeout(nextQuestion, 3000)
    } else {
        setTimeout(gameOver, 3000)
    }
}



// starts the timer
function startTimer(startValue){
    if(!timerActive){
        timer = startValue + 1;
        intervalId = setInterval(timerCountdown, 1000)
        timerActive = true;
    }
}


// stops the timer and resets it to 0
function stopTimer(){
    clearInterval(intervalId);
    timerActive = false;
    $("#timer").html("00:00") 
}


// decrements the timer and stops it at 0
function timerCountdown(){
        timer--

        // converts the timer format to look cool
        var convertedTimer = convertTime(timer)
        $("#timer").html(convertedTimer)
        
        time = initialTimer - timer
        totalTime += time;

        // stop it at 0 and go to result screen
        if(timer === 0){
            stopTimer();
            userAnswer = "";
            showResult(userAnswer)
        }
        
}


// converts time to look good on a scoreboard
function convertTime(t){
    if(t < 10){
        t = "00:0" + t
    } else {
        t = "00:" + t
    }
    return t;
}



// updates the scoreboard and stops the game when there are no more questions
//TODO: Need to create some logic to handle 2-digits. Hard-coding a '0' in front of the score = bad
function updateScoreboard(){
    $("#scoreboard-left").html("0" + correctCount);
    $("#scoreboard-right").html("0" + incorrectCount);
    if(qCount === questionContent.length){
        activeGame = false;
    }
}


// processes all results and displays them, plus adds a restart game button
function gameOver(){
    var message;
    var restartMessage = "<br>Don't forget to click the timer if you want to make next round harder or easier!"
    var percent = (Math.round((correctCount/qCount) * 100)) + "%"
    var avgTime = totalTime / qCount
    $("#title").html("Game Over")
    questionDiv.html("Grade: " + percent);
    answerDiv.html("<strong>You answered " + correctCount + " out of " + qCount + " questions correctly<br>" +
                    "Average Time per Question: " + avgTime + " second(s)</strong><br>")
    
    //loop through the object array and get the results
    for(i = 0; i < questionContent.length; i++){
        var result = "<strong>Result: "
        var qc = questionContent[i]
        // result for correct answers
        if(qc.correct){
            result = result + "Correct!</strong>"

            // go ahead and reset it while we're looping
            qc.correct = false;

        // result for incorrect answers
        } else {
            result = result + "Incorrect</strong>"
        }
            // display the results
            message = "<br>Question " + [i+1] + ": <i>" + qc.question + "</i><br>" +
                    "Correct Answer: " + qc.answer + "<br>" +
                    "Your Answer: " + qc.userAnswer + "<br>" + 
                    "Time: " + qc.time + " seconds <br>" +
                    result + "<br>" ;
                    answerDiv.append(message);

            // reset it while we're looping
            qc.userAnswer = '';  
            qc.time = 0;           
    }

    

    // poke some fun
    if(initialTimer > 19){
        restartMessage = restartMessage + "<br>" + initialTimer + " seconds is way too much time. Come on, click the timer and try again!"
    }

    //display restart button and message
    btnStart.text("Play Again!").attr({"id":"reset"})
    $("#restart").append(btnStart, restartMessage);

    // on click, reset the variables
    btnStart.on("click", function(){
        resetVar();
    })  
}


// resets the variables
function resetVar(){
    qCount = 0;
    var correctCount = 0;
    var incorrectCount = 0;
    var totalTime = 0;
    $("#restart").html("")
    updateScoreboard();
    startGame();
}


