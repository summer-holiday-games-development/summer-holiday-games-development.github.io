const words = ['beach', 'wind', 'sunny', 'sand', 'trip', 'holiday', 'swimmer', 'surfer', 
'water', 'relax', 'game',  'warm', 'ocean', 'sunshine', 'waves', 'whale', 'dolphin', 'surfboard', 
'hiking', 'adventure', 'swimming', 'boat', 'explore', 'journey', 'coconut', 'bananas', 'tree', 
'flowers', 'dunes', 'road', 'calm', 'happy', 'seagull'];

let searchedWord;

let currentRow = 0;
let currentLetter = 0;

let gameWon = false;

function changeBackground() {
    let img = Math.floor(Math.random() * 5);
    let chosenImage = `./wordguesser/images/${img}.jpg`;
    document.body.style.backgroundImage = `url(${chosenImage})`;
};

function chooseWord() {
    let num = Math.floor(Math.random() * words.length);
    searchedWord = words[num];
};

function drawGameBoard() {
    
    document.getElementById('gameboard').style.width = `fit-content`;
    document.getElementById('gameboard').style.height = `fit-content`;
    
    for (r=0; r<6; r++) {
        for (l=0; l<searchedWord.length; l++) {
            document.getElementById(`row${r}letter${l}`).style.display = "grid";
        }
    }
    for (r=0; r<6; r++) {
        for (l=searchedWord.length; l<9; l++) {
            document.getElementById(`row${r}letter${l}`).style.display = 'none';
        }
    }
    document.getElementById('gameboard').style.gridTemplateColumns = `repeat(${searchedWord.length}, 1fr)`;

    for(r=0; r<6; r++) {
        for (l=0; l<searchedWord.length; l++) {
            document.getElementById(`letter${r}-${l}`).innerHTML = " ";
            document.getElementById(`row${r}letter${l}`).style.backgroundColor = "hsla(0, 0%, 100%, 50%)"
        }
    }
    document.getElementById(`row0letter0`).style.border = "3px solid hsl(230, 70%, 50%)"
}

function checkWord() {
    let rightLetters = 0;
    for(i=0; i<searchedWord.length; i++) {
        if(searchedWord[i] == document.getElementById(`letter${currentRow}-${i}`).innerText) {
            rightLetters++;
            document.getElementById(`row${currentRow}letter${i}`).style.backgroundColor = "hsla(140, 100%, 50%, 70%)"
        } else if (searchedWord.includes(document.getElementById(`letter${currentRow}-${i}`).innerText)) {
            document.getElementById(`row${currentRow}letter${i}`).style.backgroundColor = "hsla(60, 100%, 50%, 50%)";
        } else {
            document.getElementById(`row${currentRow}letter${i}`).style.backgroundColor = "hsla(60, 0%, 70%, 50%)";
        }
    }
    if (rightLetters == searchedWord.length) {
        gameWon = true;
        playerWins();
    }
};

function gameOver() {
    document.getElementById('gameoverbox').style.display = "block";
    document.getElementById('answer').innerHTML = `The searched word is \"${searchedWord}\"` ; 
};

function playerWins() {
    document.getElementById('gameoverbox').style.display = "block";
    document.getElementById('answer').innerHTML = `Congratulations! You guessed the word in ${currentRow + 1} attempts!`;
}

function startGame() {
    document.getElementById('gameoverbox').style.display = "none";
    changeBackground();
    chooseWord();
    drawGameBoard();
    currentRow = 0;
    currentLetter = 0;
    gameWon = false;
};

document.addEventListener("keyup", function(event) {

    if (gameWon == false) {
    document.getElementById(`row${currentRow}letter${currentLetter}`).style.border = "2px solid hsl(0, 0%, 40%)"
    if(event.code >= "KeyA" && event.code <= "KeyZ") {
        if(currentLetter < searchedWord.length) {    
            document.getElementById(`letter${currentRow}-${currentLetter}`).innerHTML = event.key;
            currentLetter++;
        }  
    } else if (event.code == "Backspace") {    
        if(currentLetter > 0) {
            event.preventDefault();
            currentLetter--;
            document.getElementById(`letter${currentRow}-${currentLetter}`).innerHTML = " ";
        }  
    } else if (event.code == "Enter") {
        if(currentLetter == searchedWord.length) {
            checkWord();
            currentLetter = 0;
            currentRow++;
            if (gameWon == false) {
            }
            if(currentRow > 5 && gameWon === false) {
                gameOver();
            } 
        }
    } 
    if(currentRow < 6 && gameWon === false) {
        document.getElementById(`row${currentRow}letter${currentLetter}`).style.border = "3px solid hsl(230, 70%, 50%)";
    }
    }
})

newgamebutton.onclick = function() { 
    startGame(); 
}

howtoplaybox.onclick = function() {
    document.getElementById('howtoplay').style.display = "grid";
}
closehowtoplay1.onclick = function() {
    document.getElementById('howtoplay').style.display = "none";
}
closehowtoplay2.onclick = function() {
    document.getElementById('howtoplay').style.display = "none";
}

startGame();

// word[x] == letter 
// word.includes(letter)
