 var score = 0;

const startButton = document.getElementById('start-btn')
const questionElement = document.getElementById('question')
const highScore = document.getElementById('highScore-btn')

var answerBool = document.getElementById('tOrF')

startButton.addEventListener('click', startClock)
answerBool.addEventListener('click', answerTF)
 
 //run this function while there is time on the clock
function play() {
    var timeEl = document.querySelector("time");
    var secondsLeft = 60;
       
    //TODO find code error
    function setTime() {
        var timerInterval = setInterval(
            function() {
                secondsLeft--;
                timeEl.textContent = secondsLeft ;
        
                if(secondsLeft === 0) {
                clearInterval(timerInterval);
                noTimeLeft();
            }
        }
        , 1000);
    }
    
    nextQuestion()
}



 //check if anwer is correct
    if (questions[current].choices[answerChoice] === questions[current].answer) {
        score++;
    }
    nextQuestion()
    }

function nextQuestion() {
    
//Get next question
    
        questionElement.innerText = questions[current].title;
        answerA.innerText = questions[current].choices[0];
        answerB.innerText = questions[current].choices[1];
        current++;
    }
    else {
        noQuestions()
}
}


function noQuestions() {
//if answer all questions, show you won, the score
//then take them to the screen to put in their initials
//store initials with the score in the LocalStorate
}

function noTimeLeft() {
//if time runs out, then the person has lost, tell them so
}



//--------------------------------------------------------
//this function puts up the first question
function startGame() {
console.log('Started')
startButton.classList.add('hide') //this was not working
currentQuestionIndex = 0
questionContainerElement.classList.remove('hide')
setNextQuestion()
}

function setNextQuestion() {
//test to see if there is a next question, if not go to WIN funciton
//if there is a new question, pull it and go to showQuestions
}

// function showQuestions(question) {
//     questionElement.innerText = question.question
//     question.answers.forEach(answer => {
//         const button = document.createElement('button')
//         button.innerText = answer.text
//         button.classList.add('btn')
//         if (answer.correct) {
//             button.dataset.correct = answer.correct
//         }
//         button.addEventListener('click', selectAnswer)
//         answerButtonsElement.appendChild(button)
//     });
// }

//-----------------------------------------------------------


//     function displayMessage(type, message) {
//     msgDiv.textContent = message;
//     msgDiv.setAttribute("class", type);
//     }

// signUpButton.addEventListener("click", function(event) {
// event.preventDefault();



//Are We Saving Scores?
//         // set new submission
//         localStorage.setItem("user", JSON.stringify(user));
    
//         // get most recent submission
//         var lastUser = JSON.parse(localStorage.getItem("user"));
//         userFirstNameSpan.textContent = lastUser.firstName;
//         userLastNameSpan.textContent = lastUser.lastName;
//         userEmailSpan.textContent = lastUser.email;
//         userPasswordSpan.textContent = lastUser.password;
//     }
// });
