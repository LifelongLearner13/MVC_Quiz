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
  if (++this.currentQuestion === this.questions.length) {
    // TODO: need to handle edge case when we run out of questions - or maybe move this
    console.log('game over');
  }
};

Model.prototype.getScore = function () {
  // TODO: implement how score count is displayed in view
  console.log(this.score);
};

Model.prototype.getQuestion = function () {
  return {
    questionNum: this.currentQuestion,
    text: this.questions[this.currentQuestion].text,
    answers: this.questions[this.currentQuestion].answers
  };
};

/*------------ VIEW ------------*/

var QuestionView = function () {
  this.questionsPageElement = $('.questions-page');
  this.questionCurrentElement = $('.question-current');
  this.questionsTotalElement = $('.questions-total');
  this.questionElement = $('.question');
  this.answersElement = $('.answers');

  this.answersElement.on('click', 'button', this.onChoice.bind(this));

  this.onChange = null;
};

QuestionView.prototype.onChoice = function (event) {
  var choice = $(event.target).parent().index();
  console.log('QuestionView.prototype.onChoice: ' + choice);
  if (this.onChange) {
    this.onChange(choice);
  }
};

QuestionView.prototype.showQuestions = function () {
  this.questionsPageElement.show();
};

QuestionView.prototype.hideQuestions = function () {
  this.questionsPageElement.hide();
};

// TODO: page shows 3/0, need to show the total number of questions
QuestionView.prototype.setQuestion = function (questionObj) {
  this.questionCurrentElement.text(questionObj.questionNum);
  this.questionElement.text(questionObj.text);
  this.answersElement.empty();
  console.log('questionObj');
  console.log(questionObj);
  for (var i = 0; i < questionObj.answers.length; i++) {
    var answer = questionObj.answers[i]; // model
    this.answersElement.append('<li><button>' + answer + '</button></li>');
  }
};

// TODO: find all the binds and bind them
// TODO: somehow we have to switch views...

var ResultView = function () {
  this.resultsPageElement = $('.results-page');
  this.scoreElement = $('.score');
  this.restartButtonElement = $('.restart-button');
};

ResultView.prototype.showResults = function () {
  this.questionsPageElement.show();
};

ResultView.prototype.hideResults = function () {
  this.questionsPageElement.hide();
};

/*------------ CONTROLLER ------------*/

var Controller = function (model, questionView, resultView) {
  this.model = model;
  this.questionView = questionView;
  this.resultView = resultView;

  this.questionView.onChange = this.onAnswerSubmitted.bind(this);
};

Controller.prototype.onAnswerSubmitted = function (userChoice) {
  console.log('in Controller.prototype.onAnswerSubmitted');
  this.model.checkQuestion(userChoice);
  this.questionView.setQuestion(this.model.getQuestion());
};

/*
var showResults = function () {
  questionsPageElement.hide();
  resultsPageElement.show();
};

var showQuestions = function () {
  resultsPageElement.hide();
  questionsPageElement.show();
};

//var resetScore = function () {
//  scoreElement.text(0);
//};

var questionsPageElement = $('.questions-page');
var questionCurrentElement = $('.question-current');
var questionsTotalElement = $('.questions-total');
var questionElement = $('.question');
var answersElement = $('.answers');

var resultsPageElement = $('.results-page');
var scoreElement = $('.score');
var restartButtonElement = $('.restart-button');

var setQuestion = function (questionIndex) {
  var question = QUESTIONS[questionIndex]; // model
  questionCurrentElement.text(questionIndex);
  questionElement.text(question.text);
  answersElement.empty();
  for (var i = 0; i < question.answers.length; i++) {
    var answer = question.answers[i]; // model
    answersElement.append('<li><button type="button">' + answer + '</button></li>');
  }
};

answersElement.on('click', 'button', function () {
  var choice = $(this).parent().index();
  var questionIndex = parseInt(questionCurrentElement.text(), 10);
  var question = QUESTIONS[questionIndex]; // model
  if (question.correct === choice) { // model
    increaseScore();
  }

  if (questionIndex + 1 < QUESTIONS.length) { // model
    setQuestion(questionIndex + 1);
  } else {
    showResults();
  }
});

restartButtonElement.click(function () {
  setQuestion(0); // mostly view
  resetScore(); // view
  showQuestions(); // view
});

*/

// TODO: restart button - in the result view most likely

$(document).ready(function () {
  //  questionsTotalElement.text(QUESTIONS.length); // view
  //  setQuestion(0); // mostly view

  var model = new Model();
  var questionView = new QuestionView();
  var resultView = new ResultView();

  var controller = new Controller(model, questionView, resultView);

  questionView.setQuestion(model.getQuestion());
});
