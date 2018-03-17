// TODO: add some color, categories...


// Globals
var btnStart = $("<button>").attr({"class":"btn btn-default"});
var questionDiv = $("<h2>");
var answerDiv = $("<p>")
var initialTimer = 30;
var timer;
var time;
var totalTime = 0;
var recordTime = 0;
var wins = 0;
var losses = 0;
var ties = 0;
var correctCount = 0;
var incorrectCount = 0;
var qCount = 0;
var correctAnswer;
var userAnswer;
var timerActive = false;
var intervalId;
var activeGame = false;
var scoreboardSwitcher = true;
var gameCount = 0;

// Q & A object array
// P.S. Have fun with bigfoot trivia =)
var questionContent = [{
     question: "Which of the following actually exist?",
     options: ["Sasquatch", "Chupacrabra", "Jersey Devil", "Loch Ness Monster", "Mermaids"],
     answer: 'Sasquatch',
     userAnswer: '',
     correct: false,
     time: 0,
     bonus: 'Obviously...'
},
{
    question: "What is the estimated average height of the Sasquatch population?",
    options: ["7ft 10in", "7ft 0in", "8ft 2in", "6ft 11in", "8ft 1in"],
    answer: '7ft 10in',
    userAnswer: '',
    correct: false,
    time: 0,
    bonus: 'http://www.bigfootencounters.com/biology/henner.htm'
},
{
    question: "Was the so-called 'Patterson film' Sasquatch male or female?",
    options: ["Male", "Female", "Unknown"],
    answer: 'Female',
    userAnswer: '',
    correct: false,
    time: 0,
    bonus: 'http://www.bigfootencounters.com/biology/henner.htm'
},
{
    question: "How far back do Bigfoot legends date in North America?",
    options: ["at least 3000 years", "2000-3000 years", "1000-2000 years", "500-1000 years", "last 500 years"],
    answer: 'at least 3000 years',
    userAnswer: '',
    correct: false,
    time: 0,
    bonus: 'http://allthatsinteresting.com/bigfoot-facts#2'
},
{
    question: "Where do the majority of Bigfoot sightings occur (in the US)?",
    options: ["Pacific NW", "Southeast/Appalacian Mtns", "Midwest", "South FL", "Southwest"],
    answer: 'Pacific NW',
    userAnswer: '',
    correct: false,
    time: 0,
    bonus: 'Abouut 1/3 of all Bigfoot sightings occur in the Pacific Northwest'
},
{
    question: "According to the Bigfoot Field Researchers Org, what is the esitmated North American Sasquatch population size?",
    options: ["2000-6000", "3000-8000", "4000-9000", "10,000+", "500-2000"],
    answer: '2000-6000',
    userAnswer: '',
    correct: false,
    time: 0,
    bonus: 'https://www.bfro.net/gdb/show_FAQ.asp?id=415'
},
{
    question: "How many Bigfoot sightings have occured in North America that have been reported, investigated, and documented by the Bigfoot Field Researchers Org?",
    options: ["5000-5200", "4000-4200", "3000-3200", "6000-6200", "2000-2200"],
    answer: '5000-5200',
    userAnswer: '',
    correct: false,
    time: 0,
    bonus: '5,149 to be exact'
},
{
    question: "What's another name for Sasquatch?",
    options: ["Midnight Whistler", "Skunk Monkey", "Hairy Guy", "Gorrilla Man", "Swamp Creature"],
    answer: 'Midnight Whistler',
    userAnswer: '',
    correct: false,
    time: 0,
    bonus: 'Midnight Whistler is thought to be the earliest North American name of Bigfoot, a term originally coined by the Iroquois Indians'
},
{
    question: "What is Bigfoot called in South America?",
    options: ["Mapingauri", "Orang Pendek", "Wendigo", "Almas", "Mono de la Mofeta"],
    answer: 'Mapingauri',
    userAnswer: '',
    correct: false,
    time: 0,
    bonus: 'https://exemplore.com/cryptids/Names-for-Bigfoot-Around-the-World'
},
{
    question: "What county in GA has the most reported Bigfoot sightings?",
    options: ["White", "Fulton", "Bartow", "Paulding", "Cherokee", "Walker"],
    answer: 'White',
    userAnswer: '',
    correct: false,
    time: 0,
    bonus: 'White County has 11 sightings. Paulding comes in second at 9'
}]


window.onload = function() {
    // load initial timer
    var convertedTimer = convertTime(initialTimer)
    $("#timer").html(convertedTimer)

    // load initial score
    updateScoreboard();

    // load start button and initial message
    btnStart.text("Start Game");
    
    answerDiv.html("<p>Hint: For a real challenge, click the timer before starting the game!</p>" 
    + "<p>Also, click the scoreboard labels to toggle its display between the current game score and overall record</p>")
   .attr({"class":"msg"});
    $("#content").append(btnStart, answerDiv);

    // click events for start button, timer, and scoreboard
    btnStart.on("click", function(){
        startGame();
    })

    $("#timer").on("click", function(){
        adjustTimer();
    })

    $("#scoreboard-title").on("click", function(){
        if(!activeGame){
            if(scoreboardSwitcher){
                scoreboardSwitcher = false;
            } else {
                scoreboardSwitcher = true;
            }
        updateScoreboard();
        }
    })
}




// adjusts timer on click at start and end screens
function adjustTimer(){
    if(!activeGame && scoreboardSwitcher){
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

    //update the time in the object and update totalTime
    if(typeof time != 'number'){
        time = 0;
    }
    questionContent[qCount].time = time;
    totalTime += time;

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
        timer = startValue;
        intervalId = setInterval(timerCountdown, 1000)
        timerActive = true;
    }
}


// stops the timer and resets it to 0
function stopTimer(){
    clearInterval(intervalId);
    timerActive = false;
    $("#timer").html("00:00");
}


// decrements the timer and stops it at 0
function timerCountdown(){
        timer--

        // converts the timer format to look cool
        var convertedTimer = convertTime(timer)
        $("#timer").html(convertedTimer)
        
        // calc elapsed time for question
        time = initialTimer - timer

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
function updateScoreboard(){
    
    if(scoreboardSwitcher){
        // display current score/time
        var convertedTimer = convertTime(initialTimer)
        $("#timer").html(convertedTimer)
        $("#scoreboard-lbl-left").html("HOME");
        $("#scoreboard-lbl-center").html("CLOCK");
        $("#scoreboard-lbl-right").html("AWAY");
        // format scores
        if(correctCount > 9){
            $("#scoreboard-left").html(correctCount);
        } else {
            $("#scoreboard-left").html("0" + correctCount);
        }

        if(incorrectCount > 9){
            $("#scoreboard-right").html(incorrectCount);
        } else {
            $("#scoreboard-right").html("0" + incorrectCount);
        }
        // displays total wins/losses and best avg time
    } else {
        var convertedRecord = convertTime(recordTime)
        $("#scoreboard-lbl-left").html("WINS");
        $("#scoreboard-lbl-center").html("BEST");
        $("#scoreboard-lbl-right").html("LOSSES");
        $("#scoreboard-left").html(wins)
        $("#timer").html(convertedRecord)
        $("#scoreboard-right").html(losses)
    }
    // stops the game if this was the last question
    if(qCount === questionContent.length){
        activeGame = false;
    }
}


// processes all results and displays them, plus adds a restart game button
function gameOver(){
    var message;
    var restartMessage = "<p>Don't forget to click the timer if you want to make next round harder or easier!</p>" +
    "<p>Also, click the scoreboard labels to see your overall record!"
    var percent = (Math.round((correctCount/qCount) * 100)) + "%"
    var avgTime = totalTime / qCount

    $("#title").html("Game Over")
    questionDiv.html("Grade: " + percent);
    answerDiv.html("<p><strong>You answered " + correctCount + " out of " + qCount + " questions correctly<br>" +
                    "Average Time per Question: " + avgTime + " second(s)</strong></p><br>")

    
    //compare avg time to record avg
    if(gameCount === 0 || avgTime < recordTime){
        answerDiv.append("<p>New Record Time! Previous record was " + recordTime + " seconds! </p>");
        // TODO: add formatting logic for the scoreboard so the record doesn't have to be rounded
        recordTime = Math.round(avgTime);
    } 


    // add to win or loss totals
    if(correctCount === incorrectCount){
        ties++
    } else if(correctCount > incorrectCount){
        wins++
    } else {
        losses++
    }
    
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
                //    "Bonus Info: " + qc.bonus + "<br>" +
                    result + "<br>" ;
            answerDiv.append(message);

            // reset it while we're looping
            qc.userAnswer = '';  
            qc.time = 0;           
    }

    //display restart button and message
    btnStart.text("Play Again!").attr({"id":"reset"})
    $("#restart").append(btnStart, restartMessage).attr({"class":"msg"})

    // on click, reset the variables
    btnStart.on("click", function(){
        resetVar();
    })  
}


// resets the variables
function resetVar(){
    qCount = 0;
    correctCount = 0;
    incorrectCount = 0;
    totalTime = 0;
    gameCount++;
    scoreboardSwitcher = true;
    $("#restart").html("")
    updateScoreboard();
    startGame();
}


