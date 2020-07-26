var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var count = 0;

// for game next nextSequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level)
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  // animatePress(randomChosenColour);
}

// detecting the button and submitting the answer
$(".btn").on("click", handlerfunction);

function handlerfunction() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern);
}

// playing the correct sound for correct color
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

// some animation when button got clicked
function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}

// detecting the keypress to start and restart the game
$(document).keypress(function(e) {
  count++;
  if (count == 1) {
    $("h1").text("Level " + level);
    nextSequence();
  }
});

// check the submitted answer is correct or not
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }

}

// restart the game when game over
function startOver() {
  level = 0;
  gamePattern = [];
  count = 0;
}