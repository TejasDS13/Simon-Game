var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function playSound(color) {
  new Audio("sounds/" + color + ".mp3").play();
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).addClass("pressed");
  setTimeout(function () {
    $("#" + randomChosenColour).removeClass("pressed");
  }, 100);

  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
  console.log("game:", gamePattern);
console.log("user:", userClickedPattern);

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 800);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

var activeButton = this;
$(activeButton).addClass("pressed");

setTimeout(function () {
  $(activeButton).removeClass("pressed");
}, 100);

  checkAnswer(userClickedPattern.length - 1);
});


$(document).keypress(function () {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


