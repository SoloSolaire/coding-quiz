var codeQuiz = [ 
    {
        question: 'Which one of these is a method to output a mesage to the web console?',
        a: 'var.sort()',
        b: 'console.log()',
        c: 'Yell at the screen',
        d: 'if(){}else{}',
        answer: 'b'
    },
    {
        question: 'Which one is NOT a commonly used Data Type?',
        a: 'alert',
        b: 'boolean',
        c: 'string',
        d: 'number',
        answer: 'a'
    },
    {
        question: 'How would you add a comment in JavaScript?',
        a: '"comment"',
        b: '*comment',
        c: '<!--comment-->',
        d: '//comment',
        answer: 'd'
    },
]

var startBtn = document.querySelector('#start-btn');
var scoreEl = document.querySelector('.score');
var quizEl = document.querySelector('.quiz-container');
var bodyEl = document.querySelector('body');
var endEl = document.querySelector('.end')

var timer = 44;
var questionCounter = 0;
var highScores = [];

var scoreCounter = function() {
    scoreEl.textContent = 'Time: 45'

    var timeInterval = setInterval(function() {
        if (timer > 0 && questionCounter < codeQuiz.length) {
            scoreEl.textContent = 'Time: ' + timer;
            timer--
        } else{
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
}

var createQuiz = function() {
    document.querySelector('#instruct').remove();
    quizEl.classList.remove('hide')

    cycleQuiz(questionCounter);
    scoreCounter();
}

var cycleQuiz = function(index) {
    var questionEl = document.querySelector('.question');
    var btnA = document.getElementById('btn-a');
    var btnB = document.getElementById('btn-b');
    var btnC = document.getElementById('btn-c');
    var btnD = document.getElementById('btn-d');

    questionEl.textContent = codeQuiz[index].question;
    btnA.textContent = codeQuiz[index].a;
    btnB.textContent = codeQuiz[index].b;
    btnC.textContent = codeQuiz[index].c;
    btnD.textContent = codeQuiz[index].d;

    btnA.addEventListener('click', checkAnswer);
    btnB.addEventListener('click', checkAnswer);
    btnC.addEventListener('click', checkAnswer);
    btnD.addEventListener('click', checkAnswer);
}

var checkAnswer = function(event) {
    var clickedBtn = event.target.getAttribute('value');
    var feedbackEl = document.querySelector('.feedback');
    feedbackEl.classList.remove('hide');

    if (clickedBtn === codeQuiz[questionCounter].answer) {
        bodyEl.className = 'correct';
        feedbackEl.textContent = 'Correct!'
    } else {
        if (timer >= 5) {
            timer = timer - 5;
            scoreEl.textContent = 'Time: ' + timer;
        }
        bodyEl.className = 'wrong';
        feedbackEl.classList.remove('hide');
        feedbackEl.textContent = 'Wrong!'
    }
    questionCounter ++

    if (questionCounter < codeQuiz.length) {
        cycleQuiz(questionCounter);
    } else {
        endQuiz();
    }
}

var endQuiz = function() {
    quizEl.remove();
    scoreEl.remove();

    endEl.innerHTML = "<h2 class='end-title'>Thanks For Participating!</h2><p>Your score is " + timer + ". Please enter your initials.</p>";

    var scoreForm = document.createElement('form');
    scoreForm.id = 'score-form';
    endEl.appendChild(scoreForm);

    var nameInput = document.createElement('input');
    nameInput.className = 'name-input';
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'player-name');
    nameInput.setAttribute('placeholder', 'Enter Your Initials');
    scoreForm.appendChild(nameInput);

    var nameBtn = document.createElement('button');
    nameBtn.className = 'btn';
    nameBtn.id = 'name-btn';
    nameBtn.textContent = 'Submit';
    scoreForm.appendChild(nameBtn);

    nameBtn.addEventListener('click', saveScore);
}

var saveScore = function(event) {
    event.preventDefault()

    var playerName = document.querySelector("input[name='player-name']").value;

    if (!playerName) {
        alert('Input was left blank. Please enter your initials.')
    } else {
        var scoreObj = {
            name: playerName,
            score: timer
        }

        highScores.push(scoreObj);
        document.querySelector('#score-form').reset();
        localStorage.setItem('scores', JSON.stringify(highScores));
        document.location.href = 'highscores.html'
    }
}

var loadScores = function() {
    highScores = localStorage.getItem('scores');

    if (!highScores) {
        highScores = [];
        return false;
    }

    highScores = JSON.parse(highScores);
}

loadScores();
startBtn.addEventListener('click', createQuiz)