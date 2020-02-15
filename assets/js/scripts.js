// button java
var status = "is-hidden"
document.getElementById('button1').onclick = function(event) {
	document.getElementById('scene-container').className = status;
	if(status === "is-hidden"){
		status = "show";	
	}else{
		status = "is-hidden";
	}
 }

var status = "is-hidden"
document.getElementById('button2').onclick = function(event) {
	document.getElementById('spinglass').className = status;
	if(status === "is-hidden"){
		status = "show";	
	}else{
		status = "is-hidden";
	}
 }


var allQuestions = [];

function questionDisplay() {
  var queryURL = "https://opentdb.com/api.php?amount=50&type=boolean";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //stores all the questions from the AJAX request
    // var response = response.results[0];
    console.log(response)
    //loops through each question
    for (var i = 0; i < response.results.length; i++) {
        var current_question = response.results[i];
        console.log(current_question);
      //creates div to hold question text
      var questionDiv = $("<div class='question'>");
      
      //just stores the question data
      var respQues = current_question.question;

      //creates element to display question text
      var qTextDisplay = $("<p class='ques is-size-1'>").text(respQues);

      //Display the question text
      questionDiv.append(qTextDisplay);

      //stores the answer data
      var respAnsOne = current_question.correct_answer;
      var respAnsTwo = current_question.incorrect_answers;

      //displays the answer text for correct and incorrect answer
      var answerOneDisplay = $("<p class='button'>").text(respAnsOne);
      var answerTwoDisplay = $("<p class='button'>").text(respAnsTwo);

      
      questionDiv.append(answerOneDisplay);
      questionDiv.append(answerTwoDisplay);
      
      $("#quiz-container").prepend(questionDiv);
      return;
    }
  });
  timerCount();
}

// function renderButtons() {
//   $("answer-area").empty();

//   for (var i = 0; i < allQuestions.length; i++) {
//     var a = $("<button>");

//     a.addClass("quesArray-btn");

//     a.attr("data-name", allQuestions[i]);

//     a.text(allQuestions[i]);

//     $("#answer-area").append(a);
//   }

// }

$(".button").on("click", function(event) {
    // event.preventDefault();
    questionDisplay();
    startButton();
    timerCount();
});

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


function startButton() {
  if (questionDisplay) {
    $("#start-area").hide();
  }
}

function checkAnswers() {
  var queryURL = "https://opentdb.com/api.php?amount=50&type=boolean";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //setting variable response
    var response = response.results[0];

    var questionRender = `
          <div class="questions is-size-1" id="question">${response.question}</div>
          <div class="button is-size-3" id="button-A">${response.correct_answer}</div>
          <div class="button is-size-3" id="button-B">${response.incorrect_answers}</div>`;

    $("#quiz-ques").html(questionRender);
  });

  // if (true === correct_answer || false === correct_answer) {
  //   timerCount++;
  // } else {
  //false === incorrect_answers || true === incorrect_answers
  //   timerCount--;
  // }
  // if (response.length - 1) {
  //   endQuiz();
  //   return;
  // }
  // var questionRender = `
  // <div class="questions is-size-1" id="question">${response.question}</div>
  // <div class="button is-size-3" id="button">${response.correct_answer}</div>
  // <div class="button is-size-3" id="button">${response.incorrect_answers}</div>`

  // $("#quiz-ques").html(questionRender)
  // checkAnswers(response)
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