var score = document.createElement('span');
score.className = 'score';
score.textContent = 0;
parseInt(score.textContent);
var timer = document.querySelector('.timer');
timer.appendChild(score);

var startQuizBtn = document.querySelector('.start-quiz-btn');

var answersEl = document.querySelector('.answers');
var questionSection = document.querySelector('.question-section');
var validateAnswer = document.createElement('p');
validateAnswer.className - 'validate-answer';

var randomNum = 0;

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

    score.textContent = 75;

    displayNextQuestion();

};

var displayNextQuestion = function() {
    
    var question = document.querySelector('.question');
    randomNum = Math.floor(Math.random()* questionsArr.length);
    if (usedQuestions.includes(randomNum)) {
        displayNextQuestion();
    } else {
        usedQuestions.push(randomNum);
    }

    console.log(usedQuestions);

    var randomQuestion = questionsArr[randomNum];
    question.textContent = randomQuestion.question;

    var answersArr = randomQuestion.answers;
    var answers = document.querySelector('.answers');
    answers.innerHTML = '';
    for (i = 0; i < answersArr.length; i ++) {
        var button = document.createElement('button');
        button.setAttribute('text', answersArr[i]);
        button.innerHTML = answersArr[i];
        answers.appendChild(button);
        
    }

    checkAnswer();

};
 
var checkAnswer = function(event) {
    var userAnswer = event.target.innerHTML;
    console.log(event.target);
    console.log(userAnswer);
    if (userAnswer === questionsArr[randomNum].correctAnswer) {
        validateAnswer.textContent = 'Correct!';
        questionSection.appendChild(validateAnswer);
    } else {
        validateAnswer.textContent = 'Wrong!';
        questionSection.appendChild(validateAnswer);
        score.textContent = score.textContent - 10;
    }
    console.log(score);

    if (usedQuestions.length === questionsArr.length) {
        endGame();
    }

    setTimeout(function() {
        validateAnswer.textContent = '';
        displayNextQuestion ();
    }, 1050);
    

};

var endGame = function() {
    alert('game over!')


};



startQuizBtn.addEventListener('click', startQuizBtnHandler);

answersEl.addEventListener('click', checkAnswer);