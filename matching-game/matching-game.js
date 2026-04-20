let gameSize = 15;

let cardSize;
let boardLongSide;
let foundCardSize;
let foundCardRows;
let foundCardCols;

let cardsArray = [];

let openCard1 = null;
let openCard2 = null;

let foundPair = false;
let foundCardCounter;

let movesCounter = 0;

const cards = document.querySelectorAll('.card');
const foundcards = document.querySelectorAll('.foundcard');

cards.forEach(card => {
    card.src = 'card.jpg';
});

for (let i = 0; i < 42; i++) {
    document.getElementById(`card${i}`).addEventListener("click", function() {
        turnCard(i);
    });
}  

function checkIfCardsMatch() {
    if (cardsArray[openCard1] == cardsArray[openCard2]) {
        foundPair = true;
        if (foundCardCounter == 0) {
            closeCards();
            document.getElementById('winningbox').style.display = 'grid';
            document.getElementById('winningtext').innerHTML = `You won the game with ${movesCounter} moves!`
        }
    }
};

function openCard(num) {
    if (openCard1 == null) {   
        document.getElementById(`card${num}`).src = `./cards/card${cardsArray[num]}.jpg`; 
        openCard1 = num;
        movesCounter ++;
        document.getElementById('movesCounter').innerHTML = `moves: ${movesCounter}`;
    } else {
        document.getElementById(`card${num}`).src = `./cards/card${cardsArray[num]}.jpg`;
        openCard2 = num;
    }
};

function closeCards() {
    if (foundPair === true) {
        document.getElementById(`card${openCard1}`).style.visibility = 'hidden';
        document.getElementById(`card${openCard2}`).style.visibility = 'hidden';
        document.getElementById(`foundcard${foundCardCounter}`).style.visibility = 'visible';
        document.getElementById(`foundcard${foundCardCounter}`).src = `./cards/card${cardsArray[openCard1]}.jpg`;
        foundCardCounter--;
        foundPair = false;
    } else {
        document.getElementById(`card${openCard1}`).src = `card.jpg`;
        document.getElementById(`card${openCard2}`).src = `card.jpg`;
    }
    openCard1 = null;
    openCard2 = null;
};

function turnCard(num) {
    if (openCard2 !== null) {
        closeCards();
    }
    if (num !== openCard1) {
        openCard(num);
        checkIfCardsMatch();
    }    
}


function changeSize() {
    // changing the buttons
    document.getElementById(`button8`).style.border = ('none');
    document.getElementById('button15').style.border = ('none');
    document.getElementById('button21').style.border = ('none');
    document.getElementById(`button${gameSize}`).style.border = ('5px solid red');
    document.getElementById('button8').style.backgroundColor = ('hsl(35, 40%, 90%)');
    document.getElementById('button15').style.backgroundColor = ('hsl(35, 40%, 90%)');
    document.getElementById('button21').style.backgroundColor = ('hsl(35, 40%, 90%)');
    document.getElementById(`button${gameSize}`).style.backgroundColor = ('hsl(35, 40%, 70%)');

    for (i = 15; i < gameSize * 2; i++) {
        document.getElementById(`card${i}`).style.display = 'flex';
    }
    for (i = gameSize * 2; i < 42; i++) {
        document.getElementById(`card${i}`).style.display = 'none';
    }    
    for (i = 7; i < gameSize; i++) {
        document.getElementById(`foundcard${i}`).style.display = 'flex';
    }
    for (i = gameSize; i < 21; i++) {
        document.getElementById(`foundcard${i}`).style.display = 'none';
    }; 

    // changing the cards
    if(gameSize == 8) {
        cardSize = 24;
        boardLongSide = 100;
        rows = 4;
        cols = 4;
        foundCardSize = 14;
        foundCardRows = 2;
        foundCardCols = 4;
    } else if (gameSize == 15) {
        cardSize = 19;
        boardLongSide = 120;
        rows = 5;
        cols = 6;
        foundCardSize = 12;
        foundCardRows = 3;
        foundCardCols = 5;
    } else if (gameSize == 21) {
        cardSize = 16;
        boardLongSide = 116;
        rows = 6;
        cols = 7;
        foundCardSize = 10;
        foundCardRows = 3;
        foundCardCols = 7;
    }

    const isPortrait = window.matchMedia("(orientation: portrait)").matches;

    if (isPortrait) {
        document.getElementById('main').style.height = `${boardLongSide}vw`;
        document.getElementById('main').style.gridTemplateRows = `repeat(${cols}, 1fr)`;
        document.getElementById('main').style.gridTemplateColumns = `repeat(${rows}, 1fr)`;
    } else {
        document.getElementById('main').style.width = `${boardLongSide}vh`;
        document.getElementById('main').style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        document.getElementById('main').style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    }

    cards.forEach(card => {
        if (isPortrait) {
            card.style.width = `${cardSize}vw`;
            card.style.height = `${cardSize}vw`;
        } else {
            card.style.width = `${cardSize}vh`;
            card.style.height = `${cardSize}vh`;
        }
    });
    foundcards.forEach(foundcard => {
        if (isPortrait) {
            foundcard.style.width = `${foundCardSize}vw`;
            foundcard.style.height = `${foundCardSize}vw`;
        } else {
            foundcard.style.width = `${foundCardSize}vh`;
            foundcard.style.height = `${foundCardSize}vh`;
        }
    });

    document.getElementById('foundcardbox').style.gridTemplateRows = `repeat(${foundCardRows}, 1fr)`;
    document.getElementById('foundcardbox').style.gridTemplateColumns = `repeat(${foundCardCols}, 1fr)`;    
}


function startGame() {  
    
    cardsArray = [];
    openCard1 = null;
    openCard2 = null;
    foundCardCounter = gameSize - 1;
    document.getElementById('winningbox').style.display = 'none';

    movesCounter = 0;
    document.getElementById('movesCounter').innerHTML = 'moves: 0';

    for (i=0; i<gameSize*2; i++) {
        document.getElementById(`card${i}`).style.visibility = 'visible';
        document.getElementById(`card${i}`).src = `card.jpg`;
    }

    for (i=0; i<gameSize; i++) {
        document.getElementById(`foundcard${i}`).style.visibility = 'hidden';
        cardsArray.push(i);
        cardsArray.push(i);
    }

    for (let i = cardsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index
        [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]]; // Swap elements
    }
}


button8.onclick = function() { 
    gameSize = 8;
    changeSize();
    startGame(); 
}
button15.onclick = function() { 
    gameSize = 15;
    changeSize();
    startGame(); 
}
button21.onclick = function() { 
    gameSize = 21;
    changeSize();
    startGame(); 
}

newgamebutton.onclick = function() {
    startGame();
}

playagain.onclick = function() {
    startGame();
}

changeSize();
startGame();