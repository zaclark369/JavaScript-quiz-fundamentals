const questionsArray = [
  {
    Question: "How many fundamental data types are ther in Javascript?",
    options: ["7", "12", "3", "5"],
    correctAnswer: "7",
  },
  {
    Question: "What property of strings returns the amount of characters in the string?",
    options: ["length", "state", "string", "char"],
    correctAnswer: "length",
  },
  {
    Question: "What method of strings returns a boolean value for whether or not the string begins with a given letter?",
    options: ["capitalLetter", "startsWith()", "append", "textContent"],
    correctAnswer: "startsWith()",
  },
    {
      Question: "What Number method returns a boolean value based on whether or not a given number is an integer?",
      options: ["[i]", "xIs", "isInteger(number)", "numberValue"],
      correctAnswer: "isInteger(number)",
    },
    {
      Question: "What method of strings transforms the text to uppercase?",
      options: ["capitalLetter", "startsWith()", "append", "textContent", "toUpperCase"],
      correctAnswer: "toUpperCase",
    },
    {
      Question: "What Math method returns a random decimal value between 0 and 1?",
      options: ["random", "randomDecimal", "math", "mathFloor"],
      correctAnswer: "random",
    },
    {
      Question: "What method of strings deletes all whitespace at the beginning and end of the string?",
      options: ["removeWhite", "blank()", "trim()", "remove()"],
      correctAnswer: "trim()",
    },
    {
      Question: "How are single line comments formatted?",
      options: ["//", "?", "<-- -->", "(//)"],
      correctAnswer: "//",
    },
];

// if get extra time, seperate into different formulas and then one formula calls them all.
// this will be easier to keep track of


// begin with timer of 1:30 min (90sec)
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

// user will click begin/start button
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
        clearInterval(intervalTime);
        endGame();
      }
    }
  }
  startQuestions();
}
// first question will be displayed
function startQuestions() {
  if (questionsArray[questionCount]) {
    questionTitleEl.textContent = questionsArray[questionCount].Question;
    questionEl.innerHTML = "";
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
// user selects answer
function questionClick() {
  // check for more questions
  if (questionCount === questionsArray.length) {
    endGame(timeRemaining);
  }

  const usersChoice = this.value;
  console.log(usersChoice);
  const correctAnswer = questionsArray[questionCount].correctAnswer;
  questionCount++;
  // message (alert) display correct or incorrect
  if (usersChoice === correctAnswer) {
    textColorEl.textContent = "Correct Answer! ";
    textColorEl.style.color = "green";
    announceEl.textcontent = "Next Question:";
    // display correct if correct answer
  } else {
    timeRemaining -= 5;
    textColorEl.textContent = "Wrong Answer! ";
    textColorEl.style.color = "red";
    announceEl.textcontent = "-5 seconds, please repeat the question: ";
    // display incorrect if incorrect answer
  }
  startQuestions();
}

//   console.log("endgame");
function endGame(timeRemaining) {
  console.log("we made it to the endGame");
  let score = timeRemaining * 1000;
  if (score < 0) {
    score = 0;
  }
// if done then display score
  countdownEl.remove();
  textColorEl.textContent = "Congrats, you've completed the Quiz";
  textColorEl.style.color = "Black";
  announceEl.textContent = "Your score is: " + score;

  questionEl.remove();

  scoreForm();
// show form to store name with score
  function scoreForm() {
    console.log("scoreForm");
    const inputEl = document.createElement("INPUT");
    inputEl.setAttribute("type", "text");
    inputEl.placeholder = "Please enter the name you would like saved";
    inputEl.name = "initials";
    inputEl.id = "initials-input";

    const saveEl = document.createElement("btn");
    saveEl.id = "submission";
    saveEl.classList.add("btn-primary");
    saveEl.textContent = "SAVE";
    // insert into list form

    console.log(inputEl, saveEl);
    containerEl.appendChild(inputEl);
    containerEl.appendChild(saveEl);

    saveEl.addEventListener("click", handleScore);

    // here, here, here, inspect these elements for typos
// store score in localStorage
    function handleScore(event) {
      console.log("handlescore");
      event.preventDefault();
      const playerName = inputEl.value;
      const scoresList = document.createElement("ol");
      score = score.toString();

      if (!localStorage.getItem("high-scores")) {
        localStorage.setItem("high-scores", score);
        localStorage.setItem("name", playerName);
      }

      let highScores = localStorage.getItem("high-scores");
      highScores = highScores.split(",");
      let names = localStorage.getItem("name");
      names = names.split(",");
      containerEl.append(scoresList);
      scoresList.textContent = "Top Scores: ";
      scoresList.style.fontSize = "35px";

      handleHighScorePlacement();

      function handleHighScorePlacement() {
        console.log("highscore place");
        const scoresCount = highScores.length;
        let placeholder = 0;
        for (i = 0; i < scoresCount; i++) {
          if (
            parseInt(score) > parseInt(highScores[i]) &&
            highScores[i] !== placeholder
          ) {
            placeholder = highScores[i];
            console.log(placeholder);
            highScores.splice(i, 0, score);
            names.splice(i, 0, playerName);
          }
          if (highScores.length < 3 && score !== highScores[i]) {
            highScores.push(score);
            names.push(playerName);
          }
        }

        while (highScores.length > 3) {
          highScores.pop();
          names.pop();
        }


        // display the top 3 scores
        for (let i = 0; i < highScores.length; i++) {
          const listEl = document.createElement("li");
          listEl.textContent = `${names[i]}      ......      Score: ${highScores[i]}`;
          listEl.classList.add("score-li");
          scoresList.appendChild(listEl);
        }

        highScores = highScores.toString();
        names = names.toString();
        localStorage.setItem("high-scores", highScores);
        localStorage.setItem("name", names);
        document.querySelector("#initials-input").remove();
        event.target.remove();
      }
      createEndGameBtn();

      function createEndGameBtn() {
        console.log("create endgame button");
        const clearStorageBtn = document.createElement("btn");
        clearStorageBtn.id = "clear-storage";
        clearStorageBtn.classList.add("clear-btn");
        clearStorageBtn.textContent = "Clear Scores";
        clearStorageBtn.addEventListener("click", handleClearStorage);

        const retryBtn = document.createElement("btn");
        retryBtn.id = "retry";
        retryBtn.classList.add("clear-btn");
        retryBtn.textContent = "Retry";
        retryBtn.addEventListener("click", handleRetry);

        document.body.appendChild(retryBtn);
        document.body.appendChild(clearStorageBtn);

        function handleClearStorage(event) {
          localStorage.clear();
          scoresList.remove();
        }

        function handleRetry(event) {
          location.reload();
        }
      }
    }
  }
}
startBtnEl.onclick = beginStartButton;
