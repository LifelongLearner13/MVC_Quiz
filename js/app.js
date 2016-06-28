/*------------ MODEL ------------*/

var Model = function () {
  this.questions = [{
    text: 'Question 1',
    answers: [
      '0815',
      '2B',
      'BAM128',
      'Barely'
    ],
    correct: 0
  }, {
    text: 'Question 2',
    answers: [
      '0815',
      '2B',
      'BAM128',
      'Barely'
    ],
    correct: 1
  }, {
    text: 'Question 3',
    answers: [
      '0815',
      '2B',
      'BAM128',
      'Barely'
    ],
    correct: 2
  }, {
    text: 'Question 4',
    answers: [
      '0815',
      '2B',
      'BAM128',
      'Barely'
    ],
    correct: 3
  }];
  this.score = 0;
  this.currentQuestion = 0;
  this.onChange = null;
};

Model.prototype.resetGame = function () {
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
  };
};

/*------------ VIEW ------------*/

var QuestionView = function () {
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

QuestionView.prototype.onRestartGame = function () {
  if (this.onReset) {
    this.onReset();
  }
}

QuestionView.prototype.onChoice = function (event) {
  var choice = $(event.target).parent().index();
  if (this.onChange) {
    this.onChange(choice);
  }
};

QuestionView.prototype.showQuestions = function () {
  this.resultsPageElement.hide();
  this.questionsPageElement.show();
};

QuestionView.prototype.showResults = function () {
  this.questionsPageElement.hide();
  this.resultsPageElement.show();
};

// TODO: [x] page shows 3/0, need to show the total number of questions
QuestionView.prototype.setQuestion = function (questionObj) {
  this.questionCurrentElement.text(questionObj.questionNum + 1);
  this.questionElement.text(questionObj.text);
  this.answersElement.empty();

  for (var i = 0; i < questionObj.answers.length; i++) {
    var answer = questionObj.answers[i]; // model
    this.answersElement.append('<li><button>' + answer + '</button></li>');
  }
};

QuestionView.prototype.setResults = function (score) {
  this.scoreElement.text(score);
}

// TODO: [x] find all the binds and bind them


/*------------ CONTROLLER ------------*/

var Controller = function (model, questionView) {
  this.model = model;
  this.questionView = questionView;

  this.questionView.questionsTotalElement.text(this.model.questions.length);
  this.questionView.onChange = this.onAnswerSubmitted.bind(this);
  this.questionView.onReset = this.onRestartButton.bind(this);
  this.startGame();

};

Controller.prototype.startGame = function () {
  this.questionView.setQuestion({
    questionNum: this.model.currentQuestion,
    text: this.model.questions[this.model.currentQuestion].text,
    answers: this.model.questions[this.model.currentQuestion].answers
  });
}

Controller.prototype.onRestartButton = function () {
  this.model.resetGame();
  this.startGame();
  this.questionView.showQuestions();
}

Controller.prototype.onAnswerSubmitted = function (userChoice) {
  this.model.checkQuestion(userChoice);
  var questionObj = this.model.getQuestion();

  // TODO: [x] somehow we have to switch views...
  if (!questionObj) {
    this.questionView.setResults(this.model.getScore());
    this.questionView.showResults();
  } else {
    this.questionView.setQuestion(questionObj);
  }
};

/*------------ DOC READY ------------*/

// TODO: [x] restart button - in the result view most likely

$(document).ready(function () {
  var model = new Model();
  var questionView = new QuestionView();
  var controller = new Controller(model, questionView);
});
