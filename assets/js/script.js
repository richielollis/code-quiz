var body = document.querySelector('body');

var header = document.querySelector('.header')

var timer = document.createElement('p');
timer.className = 'timer';
timer.textContent = 'Time:' + ' ';
header.appendChild(timer);

var scoreSpan = document.createElement('span');
scoreSpan.className = 'score';
var score = 75;
scoreSpan.textContent = score;
timer.appendChild(scoreSpan);

var startQuizBtn = document.querySelector('.start-quiz-btn');

var endQuiz = document.querySelector('.end-quiz');
endQuiz.style.display = 'none';

var answersEl = document.querySelector('.answers');
var questionSection = document.querySelector('.question-section');
var validateAnswer = document.createElement('p');
validateAnswer.className = 'validate-answer';

var resetButtons = [];

var randomNum = 0;

var startTimer;

var usedQuestions = [];

var questionsArr = [

    { question: 'Commonly used data types DO NOT include:',
    answers: ['1. strings', '2. booleans', '3. alerts', '4. numbers'],
    correctAnswer: '3. alerts'}, 

    { question: 'The condition in an if / else statement is enclosed with __________.',
    answers: ['1. quotes', '2. curly brackets', '3. parenthesis', '4. square brackets'],
    correctAnswer: '3. parenthesis'},

    { question: 'Arrays in JavaScript can be used to store __________.',
    answers: ['1. numbers and strings', '2. other arrays', '3. booleans', '4. all of the above'],
    correctAnswer: '4. all of the above'},

    { question: 'String values must be enclosed within __________ when being assigned to variables.',
    answers: ['1. commas', '2. curly brackets', '3. quotes', '4. parenthesis'],
    correctAnswer: '3. quotes'},

    { question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    answers: ['1. JavaScript', '2. terminal/bash', '3. for loops', '4. console.log'],
    correctAnswer: '4. console.log'}
];

var startQuizBtnHandler = function() {
    var startQuizMain = document.querySelector('.start-quiz');
    startQuizMain.remove();
    
    startTimer = setInterval(function(){
        score--;
        scoreSpan.textContent = score;
        if (score === 0) {
            clearInterval(startTimer);
            endGame();
        }
    }, 500);
    
    displayNextQuestion();
};

var displayNextQuestion = function() {
    if (resetButtons.length > 0) {
        for (let i = 0; i < resetButtons.length; i++) {
            resetButtons[i].disabled = false;
        }
        resetButtons = [];
    }

    var question = document.querySelector('.question');
    randomNum = Math.floor(Math.random()* questionsArr.length);
    if (usedQuestions.length === questionsArr.length) {
        return
    } else if (usedQuestions.includes(randomNum)) {
        displayNextQuestion();
    } else {
        usedQuestions.push(randomNum);
    }

    var randomQuestion = questionsArr[randomNum];
    question.textContent = randomQuestion.question;

    var answersArr = randomQuestion.answers;
    var answers = document.querySelector('.answers');
    answers.innerHTML = '';
    for (i = 0; i < answersArr.length; i ++) {
        var button = document.createElement('button');
        button.className = 'answer-choices';
        button.innerHTML = answersArr[i];
        answers.appendChild(button);
        resetButtons.push(button);
        button.addEventListener('click', checkAnswer);
    }
};
 
var checkAnswer = function(event) {
    var userAnswer = event.target;
    if (resetButtons.includes(userAnswer)){
        userAnswer.className = 'user-choice'
    }

    if (resetButtons.length > 0) {
        for (let i = 0; i < resetButtons.length; i++) {
            resetButtons[i].disabled = true;
        }
        resetButtons = [];
    }


    if (userAnswer.textContent === questionsArr[randomNum].correctAnswer) {
        validateAnswer.textContent = 'Correct!';
        questionSection.appendChild(validateAnswer);
        
    } else {
        validateAnswer.textContent = 'Wrong!';
        questionSection.appendChild(validateAnswer);
        score -= 10;
    } 
    
    console.log(score)
    if (usedQuestions.length === questionsArr.length) {
        for (let i = 0; i < resetButtons.length; i++) {
            resetButtons[i].disabled = true;
    
        }
        
        setTimeout( function() {
            clearInterval(startTimer);
            endGame();
        }, 500)
       
    }

    if (score === 0) {
        setTimeout( function() {
            clearInterval(startTimer);
            endGame();
        }, 500)
    }

    setTimeout(function() {
        validateAnswer.remove();
        displayNextQuestion ();
    }, 500);
};

var endGame = function() {
        questionSection.remove();
        endQuiz.style.display = 'initial';
        var finalScore = document.querySelector('.user-final-score');
        finalScore.textContent = 'Your final score is ' + score + '.';
        userInitialsForm.addEventListener('submit', userSubmitHandler);
};

var highScores = [];

var userInitialsForm = document.querySelector('#user-initials-form');

var userSubmitHandler = function(event) {
    event.preventDefault();

    var userInitials = document.querySelector('#initials').value;
    console.log(userInitials)
    if (!userInitials) {
        alert('You need to enter your initials!')
        return false;
    }

    var highScoreObj = {
        initials: userInitials,
        score: score
    };

    highScores.push(highScoreObj)
    console.log(highScores)
    saveInitials ();
    addHighScoreEl(highScoreObj);
    userInitials.reset();
};

var saveInitials = function() {
    localStorage.setItem('userScore', JSON.stringify(highScores));

};

var recentHighScores = document.querySelector('#recent-high-scores');

var recentHighScoresArr = [];

var addHighScoreEl = function(highScoreObj) {
    var highScoreEl = document.createElement('li');
    highScoreEl.textContent = JSON.stringify(highScoreObj.initials) + ' ' + '-' + ' ' + JSON.stringify(highScoreObj.score);
    console.log(highScoreEl.textContent);
    recentHighScoresArr.push(highScoreEl.textContent);
    recentHighScores.appendChild(highScoreEl.textContent);

};

var loadHighScores = function () {
    var highScores = localStorage.getItem("userScore");

    if (!highScores) {
      return false;
    }
  
    highScores = JSON.parse(highScores);

    for (var i = 0; i < highScores.length; i++) {
        addHighScoreEl(highScores[i]);

    }

};

startQuizBtn.addEventListener('click', startQuizBtnHandler);

userInitialsForm.addEventListener('submit', userSubmitHandler);


// NEED TO REVISE HIGHSCORES ELEMENT CREATOR AND MAKE SURE LOCALSTORAGE IS WORKING PROPERLY 
// FINISH README
// ADD COMMENTS EVERYWHERE ABOUT WHAT ELEMENTS AND FUNCTIONS DO WHAT 