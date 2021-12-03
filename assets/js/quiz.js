const questionsArray = [
    {
        Question: 'what is x',
        options: ['x', 'y', 'z', 'p']
        correctAnswer: 'x',
    },
    {
        Question: 'why',
        options: ['why not', 'ad', 'f', 'z']
        correctAnswer: 'z',
    },
    {
        Question: 'kadf',
        options: ['ad', 'fa', 'da', 'dada']
        correctAnswer: 'dada',
    },
    {
        Question: '',
        options: ['', '', '', '']
        correctAnswer: '',
    },
    {
        Question: '',
        options: ['', '', '', '']
        correctAnswer: '',
    },
    {
        Question: '',
        options: ['', '', '', '']
        correctAnswer: '',
    },
    {
        Question: '',
        options: ['', '', '', '']
        correctAnswer: '',
    },
    {
        Question: '',
        options: ['', '', '', '']
        correctAnswer: '',
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
const countdownEl = document.getElementById('countdown');
countdownEl.textContent = ''

let questionCount = 0;
const startBtnEl = document.getElementById('start-btn');
const questionEl = document.getElementById('question');

const textColorEl = document.getElementById('color-text');
const announceEl = document.getElementById('announcement');
const containerEl = document.getElementById('question-container');
const listItems = document.getElementsByTagName('li');

function beginStartButton(event) {
    startCountdown();
    startBtnEl.remove();
    document.getElementById('title').remove();
    announcementEl.textContent = 'Begin!';

    function startCountdown() {
        const secInterval = setInterval(handleInterval, 1000);
        function handleInterval() {
            timeLeft--;
            countdownEl.textContent = '';
            if (timeLeft <= 0) {
                clearInterval(timeInterval);
                if (questionCount < questionsArray.length) {
                    endGame();
                }
            }
        }
    }
    startQuestions();


function startQuestions() {
    if (questionsArray[questionCount]) {
        questionEl.textContent = questionsArray[questionCount].xyz;
        for (let i = 0; i < questionsArray[questionCount].options.length; i++) {
            let option = document.createElement('li');
            option.classList.add('select-btn');
            option.textContent = questionsArray[questionCount].options[i];
            questionEl.appendChild(option);
            option.addEventListener('click', questionClick);



            function questionClick(event) {
                if (questionCount > questionArray.length - 1) {
                    endGame(timeLeft);
                }

                const usersChoice = event.target.textContent;
                const correctAnswer = questionArray[questionCount].correctAnswer;

                if (usersChoice === correctAnswer) {
                    questionCount++;

                    textColorEl.textContent = 'Correct Answer! '
                    textColorEl.style.color = 'green';
                    announcementEl.textcontent = "Next Question:";
                    startQuestions();
                }else {
                        timeLeft -= 5;
                        textColorEl.textcontent = 'Wrong Answer! ';
                        textColorEl.style.color = 'red';
                        announcementEl.textcontent = '-5 seconds, please repeat the question: ';
                        startQuestions();
                    }
                }
            }
        }
            else {
                endGame(timeLeft);
            }

        };
    

        function endQuiz(timeLeft) {
            let score = timeLeft *1000;
            if (score < 0) {
                score = 0;
            }

            countdownEl.remove();
            textColorEl.textcontent = "Congrats, you've completed the Quiz";
            textColorEl.style.color ="Yellow"
            announcementEl.textcontent = 'Your score is: ' + score;

            questionEl.remove();

            scoreForm();

            function scoreForm() {
                const inputEl = document.createElement('input');
                inputEl.placeholder = "Please enter the name you would like saved";
                inputEl.name = 'name';
                inputEl.id = 'initials-input';
                
                const saveEl = document.createElement('save');
                saveEl.id = 'submission';
                saveEl.classList.add('btn-primary');
                saveEl.textContent = 'SAVE';
                // insert into list form
                containerEl.appendChild(inputEl);
                containerEl.appendChild(saveEl);

                saveEl.addEventListener('save', handleScore);

            }


            function handleScore() {

            }

            function handleHighScorePlacement() {

            }

            function createEndGameBtn() {

            }
        }

        startQuestions();

        startBtnEl.addEventListener('click', beginStartButton);