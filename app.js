/*
GAME FUNTION:
    Player must guess a number between a min and max
    Player gets a certain amount of guesses
    Notify player of guesses remaining
    Notify the player of the correct answer if loose
    Let player choose to play again.
*/

let min = 10, 
    max = 20, 
    winningNum = getRandomNumber(),
    guessesLeft = 3;

const game = document.querySelector('#game'), 
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn')
      guessInput = document.querySelector('#guess-input'),
      message =  document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    console.log(typeof guess);
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        return;
    }

    if(guess === winningNum){
        gameOver(true,`Number ${winningNum} is correct, you win!`);
    }else{
        guessesLeft -= 1;
        if(guessesLeft === 0){
            gameOver(false, `Game over, you lost. The correct number was ${winningNum}!`);
        }else{
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});

function gameOver(won, message){
    const color = (won === true) ? 'green': 'red';
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    setMessage(message, color);

    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

function setMessage(_message, color){
    message.style.color = color;
    message.textContent = _message;
}

function getRandomNumber(){
    let number = Math.floor(Math.random() * (max-min+1)+min);
    console.log(number);
    return number; 
}
