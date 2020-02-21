var allQuestions = [];

// pulls all 50 trivia questions from opentdb API
function questionDisplay() {
  var queryURL =
    "https://opentdb.com/api.php?amount=50&type=boolean";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    allQuestions = response;
    answerCorrect = respAnsOne;
    answerWrong = respAnsTwo;

    //loops through each question
    for (var i = 0; i < response.results.length; i++) {
      var current_question = response.results[i];

      //creates div to hold question text
      var questionDiv = $("<div class='question'>");

      //just stores the question data
      var respQues = current_question.question;

      //creates element to display question text
      var qTextDisplay = $("<p class='ques is-size-4'>").text(respQues);

      //Display the question text
      questionDiv.append(qTextDisplay);

      //stores the answer data
      var respAnsOne = current_question.correct_answer;
      var respAnsTwo = current_question.incorrect_answers;
      var thisOne;
      var thatOne;
      //make a variable that is "true" for the correct answer
      //then asign it to the button it belongs to
      if (respAnsOne === "'False") {
        thisOne = false;
        thatOne = true;
      } else {
        thisOne = true;
        thatOne = false;
      }

      //displays the answer text for correct and incorrect answer
      var answerTrue = $("<p class='button is-danger'>").text(thisOne);
      var answerFalse = $("<p class='button is-danger'>").text(thatOne);
      //appends the
      questionDiv.append(answerTrue);
      questionDiv.append(answerFalse);

      $("#quiz-container").html(questionDiv);
      return;
    }
  });
}

// decodes html entities - NOT WORKING WHYYY
$.get(
  "https://opentdb.com/api.php?amount=50&type=boolean&encode=url3986",
  function(res) {
    // console.log(res.results)
    let questions = res.results.map(elem => {
      elem.question = decodeURIComponent(elem.question);
      elem.correct_answer = decodeURIComponent(elem.correct_answer);
      elem.incorrect_answers = elem.incorrect_answers.map(incorrect =>
        decodeURIComponent(incorrect)
      );

      return elem;
    });
    alert(elem.questions);
  }
);

// on start button click, questions are displayed, timer starts, then start button disappears
$("#start-button").on("click", function(event) {
  event.preventDefault();

  questionDisplay();
  startButton();
  timerCount();
});

// checks if answers are correct or incorrect, adds/subtracts time on timer accordingly - not working yet
function checkAnswers() {
  if (
    allQuestions.results.correct_answer === "true" ||
    allQuestions.results.correct_answer === "false"
  ) {
    sec += 5;
  } else {
    sec -= 5;
  }
}

// activates buttons to display questions
$(document).on("click", ".button", questionDisplay);

//function for the moment timer
function timerCount() {
  var duration = moment.duration({
    minutes: 01,
    seconds: 00
  });

  var timestamp = new Date(0, 0, 0, 2, 10, 30);
  var interval = 1;
  var timer = setInterval(function() {
    timestamp = new Date(timestamp.getTime() + interval * 1000);

    duration = moment.duration(duration.asSeconds() - interval, "seconds");
    var min = duration.minutes();
    var sec = duration.seconds();

    sec -= 1;
    if (min < 0) return clearInterval(timer);
    if (min < 10 && min.length != 2) min = "0" + min;
    if (sec < 0 && min != 0) {
      min -= 1;
      sec = 59;
    } else if (sec < 10 && sec.length != 2) sec = "0" + sec;

    $("#countdown").text(min + ":" + sec);
    if (sec <= 5) {
      $("#countdown").attr("style", "color: red");
    }
    if (min == 0 && sec == 0) clearInterval(timer);
  }, 1000);
}

// hides start button
function startButton() {
  if (questionDisplay) {
    $("#start-area").hide();
  }
}

// not working
function endQuiz() {
  if (timerCount === 0) {
    "#quiz-container".hide();
  }
  questionDisplay();
  $("img").explode();
}

$("img").explodeRestore();

$("img").explode({

    omitLastLine: false,
    radius: 80,
    minRadius: 20,
    release: true,
    fadeTime: 300,
    recycle: true,
    recycleDelay: 500,
    fill: true,
    explodeTime: 300,
    maxAngle: 360,
    gravity: 0,
    round: false,
    groundDistance: 400,
    ignoreCompelete: false,
    land: true,
    checkOutBound,
    finish,
    
  });
  


// not working
function highScoresDisplay() {}

// var WEBGL = {

// 	isWebGLAvailable: function () {

// 		try {

// 			var canvas = document.createElement( 'canvas' );
// 			return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

// 		} catch ( e ) {

// 			return false;

// 		}

// 	},

// 	isWebGL2Available: function () {

// 		try {

// 			var canvas = document.createElement( 'canvas' );
// 			return !! ( window.WebGL2RenderingContext && canvas.getContext( 'webgl2' ) );

// 		} catch ( e ) {

// 			return false;

// 		}

// 	},

// 	getWebGLErrorMessage: function () {

// 		return this.getErrorMessage( 1 );

// 	},

// 	getWebGL2ErrorMessage: function () {

// 		return this.getErrorMessage( 2 );

// 	},

// 	getErrorMessage: function ( version ) {

// 		var names = {
// 			1: 'WebGL',
// 			2: 'WebGL 2'
// 		};

// 		var contexts = {
// 			1: window.WebGLRenderingContext,
// 			2: window.WebGL2RenderingContext
// 		};

// 		var message = 'Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>';

// 		var element = document.createElement( 'div' );
// 		element.id = 'webglmessage';
// 		element.style.fontFamily = 'monospace';
// 		element.style.fontSize = '13px';
// 		element.style.fontWeight = 'normal';
// 		element.style.textAlign = 'center';
// 		element.style.background = '#fff';
// 		element.style.color = '#000';
// 		element.style.padding = '1.5em';
// 		element.style.width = '400px';
// 		element.style.margin = '5em auto 0';

// 		if ( contexts[ version ] ) {

// 			message = message.replace( '$0', 'graphics card' );

// 		} else {

// 			message = message.replace( '$0', 'browser' );

// 		}

// 		message = message.replace( '$1', names[ version ] );

// 		element.innerHTML = message;

// 		return element;

// 	}

// };

//export { WEBGL };
