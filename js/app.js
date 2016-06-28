/*------------ MODEL ------------*/

var Model = function () {
  this.questions = [
    {
        text: '<:48:x<:65:=<:6C:$=$=$$~<:03:+$~<:ffffffffffffffbd:+$<:ffffffffffffffb1:+$<:57:~$~<:18:x+$~<:03:+$~<:06:x-$x<:0e:x-$=x<:43:x-$',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: '0815'
    },
    {
        text: '+0+0+0+0+0+0+0+2)+0+0+9)+7))+3)-0-0-0-0-0-0-0-9)+0+0+0+0+0+0+0+0+7)-8)+3)-6)-8)-7-0-0-0-0-0-0)',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: '2B'
    },
    {
        text: '*6*3p*4*3*2*0p*2*1*0pp>0*1*0p*5*4*0p*5*4*2*1*0p*4*3p*1*0p/+0p+0*6*5*2p+0*5*0p',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 'BAM128'
    },
    {
        text: ']xhhhhooooooooohhhhhhxooooooooxooooooxjjjxhoooohhhxhohhhhhhhxhhhhjjjhhhxhhhhooooooooohhhhhhxjjjxxjjjjjjjxjhhhhxjhhhhhhhhjjjhh~',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 'Barely'
    }
];
  this.shuffleQuestions(this.questions);
  this.score = 0;
  this.currentQuestion = 0;
  this.onChange = null;
};

Model.prototype.resetGame = function () {
  this.shuffleQuestions(this.questions);
  this.score = 0;
  this.currentQuestion = 0;
};

Model.prototype.checkQuestion = function (input) {
  if (input === this.questions[this.currentQuestion].correct) {
    this.score++;
  }
};

Model.prototype.getScore = function () {
  // TODO: [x] implement how score count is displayed in view
  return this.score;
};

Model.prototype.getQuestion = function () {
  if (++this.currentQuestion === this.questions.length) {
    // TODO: [x] need to handle edge case when we run out of questions - or maybe move this
    return false;
  } else {
    return {
      questionNum: this.currentQuestion,
      text: this.questions[this.currentQuestion].text,
      answers: this.questions[this.currentQuestion].answers
    };
  }
};

Model.prototype.shuffleQuestions = function() {
  this.questions = shuffle(this.questions);

  for (var q in this.questions) {
    this.questions[q].answers = shuffle(this.questions[q].answers);
  }
};

function shuffle(array) {
  return array.sort(function() {
    return Math.random() - 0.5;
  });
}

/*------------ VIEW ------------*/

var View = function () {
  this.questionsPageElement = $('.questions-page');
  this.questionCurrentElement = $('.question-current');
  this.questionsTotalElement = $('.questions-total');
  this.questionElement = $('.question');
  this.answersElement = $('.answers');
  this.resultsPageElement = $('.results-page');
  this.scoreElement = $('.score');
  this.restartButtonElement = $('.restart-button');

  this.answersElement.on('click', 'button', this.onChoice.bind(this));
  this.resultsPageElement.on('click', 'button', this.onRestartGame.bind(this));
  this.onChange = null;
  this.onReset = null;
};

View.prototype.onRestartGame = function () {
  if (this.onReset) {
    this.onReset();
  }
};

View.prototype.onChoice = function (event) {
  var choice = $(event.target).text();
  if (this.onChange) {
    this.onChange(choice);
  }
};

View.prototype.showQuestions = function () {
  this.resultsPageElement.hide();
  this.questionsPageElement.show();
};

View.prototype.showResults = function () {
  this.questionsPageElement.hide();
  this.resultsPageElement.show();
};

// TODO: [x] page shows 3/0, need to show the total number of questions
View.prototype.setQuestion = function (questionObj) {
  this.questionCurrentElement.text(questionObj.questionNum + 1);
  this.questionElement.text(questionObj.text);
  this.answersElement.empty();

  for (var i = 0; i < questionObj.answers.length; i++) {
    var answer = questionObj.answers[i]; // model
    this.answersElement.append('<li><button>' + answer + '</button></li>');
  }
};

View.prototype.setResults = function (score) {
  this.scoreElement.text(score);
};

// TODO: [x] find all the binds and bind them


/*------------ CONTROLLER ------------*/

var Controller = function (model, view) {
  this.model = model;
  this.view = view;

  this.view.questionsTotalElement.text(this.model.questions.length);
  this.view.onChange = this.onAnswerSubmitted.bind(this);
  this.view.onReset = this.onRestartButton.bind(this);
  this.startGame();

};

Controller.prototype.startGame = function () {
  this.view.setQuestion({
    questionNum: this.model.currentQuestion,
    text: this.model.questions[this.model.currentQuestion].text,
    answers: this.model.questions[this.model.currentQuestion].answers
  });
};

Controller.prototype.onRestartButton = function () {
  this.model.resetGame();
  this.startGame();
  this.view.showQuestions();
};

Controller.prototype.onAnswerSubmitted = function (userChoice) {
  this.model.checkQuestion(userChoice);
  var questionObj = this.model.getQuestion();

  // TODO: [x] somehow we have to switch views...
  if (!questionObj) {
    this.view.setResults(this.model.getScore());
    this.view.showResults();
  } else {
    this.view.setQuestion(questionObj);
  }
};

/*------------ DOC READY ------------*/

// TODO: [x] restart button - in the result view most likely

$(document).ready(function () {
  var model = new Model();
  var view = new View();
  var controller = new Controller(model, view);
});
