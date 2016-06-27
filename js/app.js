/*------------ MODEL ------------*/

var Model = function() {
  this.questions = [{
    text: '<:48:x<:65:=<:6C:$=$=$$~<:03:+$~<:ffffffffffffffbd:+$<:ffffffffffffffb1:+$<:57:~$~<:18:x+$~<:03:+$~<:06:x-$x<:0e:x-$=x<:43:x-$',
    answers: [
      '0815',
      '2B',
      'BAM128',
      'Barely'
    ],
    correct: 0
  }, {
    text: '+0+0+0+0+0+0+0+2)+0+0+9)+7))+3)-0-0-0-0-0-0-0-9)+0+0+0+0+0+0+0+0+7)-8)+3)-6)-8)-7-0-0-0-0-0-0)',
    answers: [
      '0815',
      '2B',
      'BAM128',
      'Barely'
    ],
    correct: 1
  }, {
    text: '*6*3p*4*3*2*0p*2*1*0pp>0*1*0p*5*4*0p*5*4*2*1*0p*4*3p*1*0p/+0p+0*6*5*2p+0*5*0p',
    answers: [
      '0815',
      '2B',
      'BAM128',
      'Barely'
    ],
    correct: 2
  }, {
    text: ']xhhhhooooooooohhhhhhxooooooooxooooooxjjjxhoooohhhxhohhhhhhhxhhhhjjjhhhxhhhhooooooooohhhhhhxjjjxxjjjjjjjxjhhhhxjhhhhhhhhjjjhh~',
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

Model.prototype.resetGame = function() {
  this.score = 0;
  this.currentQuestion = 0;
};

Model.prototype.checkQuestion = function(input) {
  if (input === this.questions[this.currentQuestion].correct) {
    this.score++;
  }
  if (++this.currentQuestion === this.questions.length) {
    console.log('game over');
  }
};

Model.prototype.getScore = function() {
  console.log(this.score);
};

Model.prototype.getQuestion = function() {
  return {
    questionNum: currentQuestion,
    text: this.questions[this.currentQuestion].text,
    answers: this.questions[this.currentQuestion].answers
  };
};

var model = new Model();

/*------------ VIEW ------------*/

var QuestionView = function() {
  this.questionsPageElement = $('.questions-page');
  this.questionCurrentElement = $('.question-current');
  this.questionsTotalElement = $('.questions-total');
  this.questionElement = $('.question');
  this.answersElement = $('.answers');

  this.answersElement.on('click', 'button', this.onChoice());

  this.onChange = null;
  };

  QuestionView.prototype.onChoice = function() {
    var choice = $(this).parent().index();
    if (this.onChange) {
      this.onChange(choice);
    }
    // var questionIndex = parseInt(questionCurrentElement.text(), 10);
    // var question = QUESTIONS[questionIndex]; // model
    // if (question.correct === choice) { // model
    //   increaseScore();
    // }

    // if (questionIndex + 1 < QUESTIONS.length) { // model
    //   setQuestion(questionIndex + 1);
    // } else {
    //   showResults();
    // }
  };

QuestionView.prototype.showQuestions = function() {
  this.questionsPageElement.show();
};

QuestionView.prototype.hideQuestions = function() {
  this.questionsPageElement.hide();
};

QuestionView.prototype.setQuestion = function(questionObj) {
  questionCurrentElement.text(questionObj.questionNum);
  questionElement.text(questionObj.text);
  answersElement.empty();
  for (var i = 0; i < questionObj.answers.length; i++) {
    var answer = questionObj.answers[i]; // model
    answersElement.append('<li><button id="' + i + '" type="button">' + answer + '</button></li>');
  }
};



var ResultView = function() {
  this.resultsPageElement = $('.results-page');
  this.scoreElement = $('.score');
  this.restartButtonElement = $('.restart-button');
};

ResultView.prototype.showResults = function() {
  this.questionsPageElement.show();
};

ResultView.prototype.hideResults = function() {
  this.questionsPageElement.hide();
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

$(document).ready(function() {
  //  questionsTotalElement.text(QUESTIONS.length); // view
  //  setQuestion(0); // mostly view
});
