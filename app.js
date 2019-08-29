// Game Function:
// - Player must guess a number between a min and a max
// - Player gets a certain amount of guesses
// - Notify player of guesses remaining
// - Notify player of the correct answer if lose
// - Let player choose to play again

// Game values
let min = 1,
  max = 20,
  // Hoisting: possible in JS- call functions before declaring them
  winningNumber = getRandomNumber(min, max),
  guessesLeft = 3;

// UI Elements
// uiGame is the entire game wrapper, will use for play again game reset
const uiGame = document.getElementById('game'),
  uiMinNumber = document.querySelector('.min-num'),
  uiMaxNumber = document.querySelector('.max-num'),
  uiGuessBtn = document.querySelector('#guess-btn'),
  uiGuessInput = document.querySelector('#guess-input'),
  uiMessage = document.querySelector('.message');

// Assign UI min and max, to show in the HTML
uiMinNumber.textContent = min;
uiMaxNumber.textContent = max;

// Play again event listener
// use mousedown instead of click because otherwise it will reset the game
// whenever the player clicks on uiGuessBtn
uiGame.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    // reset the window
    window.location.reload();
  }
});

// Listen for guess
uiGuessBtn.addEventListener('click', function() {
  let guess = parseInt(uiGuessInput.value);

  // Validate entered value; field not blank, value withing minmax range
  // as guess is a parseInt, if field is blank the returned value will be NaN
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Game Over - won
  // Check if winning number
  if (guess === winningNumber) {
    gameOver(true, `${winningNumber} is correct, YOU WIN!`);
  } else {
    // Wrong number, subtract from no. of guesses left
    guessesLeft--;

    // Check if guesses left
    if (guessesLeft === 0) {
      gameOver(
        false,
        `The winning number was ${winningNumber}. Better luck next time!`
      );
    } else {
      // Game continues - answer wrong
      uiGuessInput.style.borderColor = 'red';

      // Clear input
      uiGuessInput.value = '';

      // Inform user that the number is not correct
      setMessage(
        `${guess} is not correct, you have ${guessesLeft} more tries`,
        'red'
      );
    }
  }
});

// Game Over - won and Game Over - lost
// won will be true or false, msg will vary depending on the case
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');

  // Disable the input
  uiGuessInput.disabled = true;
  // Change border color to green to show player won
  uiGuessInput.style.borderColor = color;
  // Set text color
  uiMessage.style.color = color;
  // Set message
  setMessage(msg);

  // Play again?
  uiGuessBtn.value = 'Play again?';
  // += appends a class
  uiGuessBtn.className += 'play-again';
}

// Get random winning number
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
  // error text color will be red
  uiMessage.style.color = color;
  uiMessage.textContent = msg;
}
