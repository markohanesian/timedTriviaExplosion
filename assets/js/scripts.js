var allQuestions;
var answerCorrect;
var answerWrong;
var score;

// pulls all 50 trivia questions from opentdb API
function questionDisplay() {
  var queryURL = "https://opentdb.com/api.php?amount=50&type=boolean";

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
        console.log(current_question);
      //creates div to hold question text
      var questionDiv = $("<div class='question'>");
      
      //just stores the question data
      var respQues3 = current_question.question;
      respQues = decodeURIComponent(respQues3);
      console.log("this is line 28! " + respQues);
      respQues = decodeURI(respQues3);
      console.log("this is line 31! " + respQues);

      //creates element to display question text
      var qTextDisplay = $("<p class='ques is-size-1'>").text(respQues);

      //Display the question text
      questionDiv.append(qTextDisplay);

      //stores the answer data
      var respAnsOne = current_question.correct_answer;
      var respAnsTwo = current_question.incorrect_answers;
      var thisOne;
      var thatOne;

      //make a vaiable that is "true" for the correct answer
      //then asign it to the button it belongs to
      if (respAnsOne === "'False") {
        thisOne = false;
        thatOne = true;        
      }
      else {
        thisOne = true;
        thatOne =false;
      }
    
      //displays the answer text for correct and incorrect answer
      var answerTrue = $("<p class='button'>").text(thisOne);
      var answerFalse = $("<p class='button'>").text(thatOne);

      //appends the
      questionDiv.append(answerTrue);
      questionDiv.append(answerFalse);
      
      $("#quiz-container").html(questionDiv);
      console.log(questionDiv);
      console.log(html(questionDiv));
      return;
    }
  });
}

// on start button click, questions are displayed, timer starts, then start button disappears
$("#start-button").on("click", function(event) {
    event.preventDefault();
  
    questionDisplay();
    startButton();
    timerCount();
});

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

    $(".countdown").text(min + ":" + sec);
    if (min == 0 && sec == 0) clearInterval(timer);
  }, 1000);
}

// hides start button
function startButton() {
  if (questionDisplay) {
    $("#start-area").hide();
  }
}

// checks if answers are correct or incorrect, adds/subtracts time on timer accordingly
function checkAnswers() {
  if (answerCorrect === "true" || answerCorrect === "false") {
    console.log(answerCorrect)
    timerCount += 5 
    score++
    console.log(score)
  } else {
    timerCount -= 5
  }
}

var WEBGL = {

	isWebGLAvailable: function () {

		try {

			var canvas = document.createElement( 'canvas' );
			return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

		} catch ( e ) {

			return false;

		}

	},

	isWebGL2Available: function () {

		try {

			var canvas = document.createElement( 'canvas' );
			return !! ( window.WebGL2RenderingContext && canvas.getContext( 'webgl2' ) );

		} catch ( e ) {

			return false;

		}

	},

	getWebGLErrorMessage: function () {

		return this.getErrorMessage( 1 );

	},

	getWebGL2ErrorMessage: function () {

		return this.getErrorMessage( 2 );

	},

	getErrorMessage: function ( version ) {

		var names = {
			1: 'WebGL',
			2: 'WebGL 2'
		};

		var contexts = {
			1: window.WebGLRenderingContext,
			2: window.WebGL2RenderingContext
		};

		var message = 'Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>';

		var element = document.createElement( 'div' );
		element.id = 'webglmessage';
		element.style.fontFamily = 'monospace';
		element.style.fontSize = '13px';
		element.style.fontWeight = 'normal';
		element.style.textAlign = 'center';
		element.style.background = '#fff';
		element.style.color = '#000';
		element.style.padding = '1.5em';
		element.style.width = '400px';
		element.style.margin = '5em auto 0';

		if ( contexts[ version ] ) {

			message = message.replace( '$0', 'graphics card' );

		} else {

			message = message.replace( '$0', 'browser' );

		}

		message = message.replace( '$1', names[ version ] );

		element.innerHTML = message;

		return element;

	}

};

//export { WEBGL };