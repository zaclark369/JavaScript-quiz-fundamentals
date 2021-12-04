const questionsArray = [
  {
    Question: "what is x",
    options: ["x", "y", "z", "p"],
    correctAnswer: "x",
  },
  {
    Question: "why",
    options: ["why not", "ad", "f", "z"],
    correctAnswer: "z",
  },
  {
    Question: "kadf",
    options: ["ad", "fa", "da", "dada"],
    correctAnswer: "dada",
  },
  {
    Question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  },
  {
    Question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  },
  {
    Question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  },
  {
    Question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  },
  {
    Question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  },
];

// begin with timer of 1:30 min (90sec)
// user will click begin/start button
// first question will be displayed
// user selects answer
// message (alert) display correct or incorrect
// display correct if correct answer
// display incorrect if incorrect answer
// check for more questions
// if so move to next question
// if done then display score
// store score in localStorage
// show form to store name with score
// display 'conrats! your score is: '
// display the top 3 scores

let timeRemaining = 90;
const countdownEl = document.getElementById("countdown");
// countdownEl.textContent = ''
let intervalTime;

let questionCount = 0;
const startBtnEl = document.getElementById("start-btn");
const questionEl = document.getElementById("question");
const questionTitleEl = document.getElementById("questionTitle");

const textColorEl = document.getElementById("color-text");
const announceEl = document.getElementById("announcement");
const containerEl = document.getElementById("question-container");
const listItems = document.getElementsByTagName("li");

function beginStartButton() {
  startCountdown();
  startBtnEl.remove();
  document.getElementById("title").remove();
  announceEl.textContent = "Begin!";

  function startCountdown() {
    intervalTime = setInterval(handleInterval, 1000);
    function handleInterval() {
      timeRemaining--;
      countdownEl.textContent = timeRemaining;
      if (timeRemaining <= 0) {
        clearInterval(timeInterval);
        endGame();
      }
    }
  }
  startQuestions();

  function startQuestions() {
    if (questionsArray[questionCount]) {
      questionTitleEl.textContent = questionsArray[questionCount].Question;
      questionEl.innerHTML='';
      for (let i = 0; i < questionsArray[questionCount].options.length; i++) {
        let option = document.createElement("button");
        option.setAttribute("class", "select-btn");
        option.setAttribute("value", questionsArray[questionCount].options[i]);
        option.textContent = questionsArray[questionCount].options[i];
        questionEl.appendChild(option);
        option.onclick = questionClick;
      }
    }
  }
  function questionClick() {
    if (questionCount === questionsArray.length) {
      endGame(timeRemaining);
    }

    const usersChoice = this.value;
    console.log(usersChoice);
    const correctAnswer = questionsArray[questionCount].correctAnswer;
    questionCount++;
    if (usersChoice === correctAnswer) {
      textColorEl.textContent = "Correct Answer! ";
      textColorEl.style.color = "green";
      announceEl.textcontent = "Next Question:";
    } else {
      timeLeft -= 5;
      textColorEl.textcontent = "Wrong Answer! ";
      textColorEl.style.color = "red";
      announceEl.textcontent = "-5 seconds, please repeat the question: ";
    }
    startQuestions();
  }
}
  console.log("endgame");
  //   function endGame(timeRemaining) {
  //       console.log("we made it to the endGame");
  //     let score = timeLeft * 1000;
  //     if (score < 0) {
  //       score = 0;
  //     }

  //     countdownEl.remove();
  //     textColorEl.textcontent = "Congrats, you've completed the Quiz";
  //     textColorEl.style.color = "Yellow";
  //     announceEL.textcontent = "Your score is: " + score;

  //     questionEl.remove();

  //     scoreForm();

  //     function scoreForm() {
  //       const inputEl = document.createElement("input");
  //       inputEl.placeholder = "Please enter the name you would like saved";
  //       inputEl.name = "name";
  //       inputEl.id = "initials-input";

  //       const saveEl = document.createElement("save");
  //       saveEl.id = "submission";
  //       saveEl.classList.add("btn-primary");
  //       saveEl.textContent = "SAVE";
  //       // insert into list form
  //       containerEl.appendChild(inputEl);
  //       containerEl.appendChild(saveEl);

  //       saveEl.addEventListener("save", handleScore);
  //     }

  //     function handleScore() {}

  //     function handleHighScorePlacement() {}

  //     function createEndGameBtn() {}
  //   }

  

startBtnEl.onclick = beginStartButton;
