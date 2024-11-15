let score  = JSON.parse(localStorage.getItem('message')) || {
    wins: 0,
    loses: 0,
    ties: 0
};

document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}` || 'Wins: 0, Losses: 0, Ties: 0';

function resetScore(){
    document.querySelector('.js-confirmationMessage').innerHTML = `
        Are you sure you want to reset the score?
        <button class="confirm-yes-btn js-confirm-yes-btn">Yes</button>
        <button class="confirm-no-btn js-confirm-no-btn">No</button>
    `;

    document.body.addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            resetYes();
        } else if(event.key === 'Backspace'){
            resetNo();
        }
    });

    function resetYes(){
        score.wins = 0;
        score.loses = 0;
        score.ties = 0;

        document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}`;
        document.querySelector('.js-result').innerHTML = '';
        document.querySelector('.js-moves').innerHTML = '';

        localStorage.removeItem('message');
        document.querySelector('.js-confirmationMessage').innerHTML = '';
    }

    function resetNo(){
        document.querySelector('.js-confirmationMessage').innerHTML = '';
    }

    document.querySelector('.js-confirm-yes-btn').addEventListener('click', () => {
        resetYes();
    });

    document.querySelector('.js-confirm-no-btn').addEventListener('click', () => {
        resetNo();
    });
}

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r'){
        playGame('rock');
    } else if(event.key === 'p'){
        playGame('paper');
    } else if(event.key === 's'){
        playGame('scissors');
    }
});

document.querySelector('.js-rock-btn').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-btn').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-btn').addEventListener('click', () => {
    playGame('scissors');
});

function playGame(playerMove){

    const computerMove = generateComputerMove();

    let result = '';

    if(playerMove === 'rock'){
        if(computerMove === 'rock'){
            result = 'Tie';
        } else if (computerMove === 'paper'){
            result = 'Lose';
        } else{
            result = 'Win';
        }

    } else if (playerMove === 'scissors'){
        if(computerMove === 'rock'){
            result = 'Lose';
        } else if (computerMove === 'paper'){
            result = 'Win';
        } else{
            result = 'Tie';
        }

    } else if (playerMove === 'paper'){
        if(computerMove === 'rock'){
            result = 'Win';
        } else if (computerMove === 'paper'){
            result = 'Tie';
        } else{
            result = 'Lose';
        }
    }

    if(result === 'Win'){
        score.wins ++;
    } else if(result === 'Tie'){
        score.ties ++;
    } else if(result === 'Lose'){
        score.loses ++;
    }

    localStorage.setItem('message', JSON.stringify(score));

    document.querySelector('.js-moves').innerHTML = `You <img src="${playerMove}-emoji.png" class="move-img"> <img src="${computerMove}-emoji.png" class="move-img">Computer`;
    document.querySelector('.js-result').innerHTML = `You ${result}`;
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}`;
}

function generateComputerMove(){
    const randomNumber = Math.random();
    let computerMove = '';

    if(randomNumber>=0 && randomNumber<1/3){
        computerMove = 'rock';
    } else if (randomNumber>=1/3 && randomNumber<2/3){
        computerMove = 'paper';
    } else if (randomNumber>=2/3 && randomNumber<1){
        computerMove = 'scissors';
    }

    return computerMove;
}

document.querySelector('.js-reset-btn').addEventListener('click', () => {
    resetScore();
});

document.querySelector('.js-autoplay-btn').addEventListener('click', () => {
    autoPlay();
});

let autoFlag = false;
let intervalId;
function autoPlay(){
    if(!autoFlag){
        intervalId = setInterval(() => {
            const playerMove = generateComputerMove();
            playGame(playerMove);
        }, 1000);
        autoFlag = true;

        document.querySelector('.js-autoplay-btn').innerHTML = 'Stop Auto Play';
    } else {
        clearInterval(intervalId);
        autoFlag = false;
        document.querySelector('.js-autoplay-btn').innerHTML = 'Auto Play';
    }   
}

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'a'){
        autoPlay();
    } else if(event.key === 'Backspace'){
        resetScore();
    }
});
