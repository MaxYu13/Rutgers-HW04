var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");

var questionIndex = 0;
var correctCount = 0;
var time = 60;
var intervalId;

var highscore = {
  name: "",
  score: "",

}

function endQuiz() {
  clearInterval(intervalId);
  var body = document.body;
  body.innerHTML = "Game over, You scored " + correctCount;
  setTimeout(showHighScore(),2000)

  // wait 2 seconds and call showHighScore;
}
function sort(a)
{
  for(i = 0; i<a.length-1; i++)
  {
    if(a[i]>a[i+1])
    {
      var temp = a[i]
      a[i] = a[i+1]
      a[i+1] = temp
    }
  }
  return a
}
function showHighScore() {

  var myName = prompt("Please Enter Your Name")
  highscore.name = myName
  localStorage.setItem(myName, correctCount)
  //setTimeout(function(){
    var allScores = localStorage.getItem("User")
    console.log(allScores)
    var keys = Object.keys(localStorage)
    var highscorelist = document.createElement("div")
    var orderedHSL = document.createElement("ol")


    var sorted = sort(keys)
    for(i = 0;i<keys.length;i++)
    {
      var scoreListEl = document.createElement("li")
      scoreListEl.textContent = sorted[i]
      orderedHSL.append(scoreListEl)
    }
    highscorelist.append(orderedHSL)
    console.log(keys)
    console.log(highscorelist)
    document.body.appendChild(highscorelist)
  //},5000)
  // write code here

}
function clearHighScores(){
  localStorage.removeItem("User")

}

function updateTime() {
  if (time <= 0) {
    endQuiz();
  }
  else{
  time--;
  timerEl.textContent = time;
  }
}

function renderQuestion() {
  if (time == 0) {
    updateTime();
    return;
  }
  
  intervalId = setInterval(updateTime, 1000);
  questionEl.textContent = questions[questionIndex].question;

  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;

  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  }
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
}

function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect";
      if(time>=2)
      {
      time = time - 2;
      }
      timerEl.textContent = time;
    }
  }
  setTimeout(nextQuestion, 2000);
}

renderQuestion();
optionListEl.addEventListener("click", checkAnswer);
