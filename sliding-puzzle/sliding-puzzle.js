let imageChoice = "ocean";
let moves = 0;

let rowLength = 4;

const prepareCards = (size) => 
    Array.from({ length: size }, (_, row) =>
        Array.from({ length: size }, (_, col) => ({
            spot: `spot${row * size + col}`, 
            empty: true, 
            card: 0,
            cardFinished: row * size + col
        }))
    );

const small = prepareCards(3);
const medium = prepareCards(4);
const big = prepareCards(5);

let items = medium;

function prepareSpots() {
    let spotCounter = 0;
    // change the grid and put every card in the right place
    for (let i=0; i<rowLength*rowLength; i++) {
        document.getElementById(`spot${i}`).style.display = 'flex';
    }
    for (let i=rowLength*rowLength; i<25; i++) {
        document.getElementById(`spot${i}`).style.display = 'none';
    }
    const mainElement = document.querySelector('main');
    mainElement.style.gridTemplateRows = `repeat(${rowLength}, 1fr)`;
    mainElement.style.gridTemplateColumns = `repeat(${rowLength}, 1fr)`;
    // make the cards clickable
    for (let i=0; i<rowLength; i++) {
        for (let j=0; j<rowLength; j++) {
            document.getElementById(`spot${spotCounter}`).onclick = function() { 
                switchPieces(i, j);
                playerWins(); 
            } 
            spotCounter++;
        }
    }
    // change size of the cards
    let cardSize;
    if (rowLength == 3) {
        cardSize = 33;
    } else if (rowLength == 4) {
        cardSize = 24.7;
    } else if (rowLength == 5) {
        cardSize = 19.8;
    }
    const spots = document.querySelectorAll('.spot');
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;

    spots.forEach(spot => {
        if (isPortrait) {
            spot.style.width = `${cardSize}vw`;
            spot.style.height = `${cardSize}vw`;
        } else {
            spot.style.width = `${cardSize}vh`;
            spot.style.height = `${cardSize}vh`;
        }
    });
}

function playerWins() {
    const isSolved = items.every(row => 
        row.every((item) => item.card == item.cardFinished)
    );
    
    if (isSolved) {
        document.getElementById('solved').innerHTML = `Congratulations! You solved the puzzle with ${moves} moves!`;
        document.getElementById('finishedPicture').src=`sliding-puzzle/images/${imageChoice}.webp`
        document.getElementById('finishedPicture').style.display = 'flex';
        document.getElementById('newGame').innerHTML = 'Play again';
    }         
}

function change(rowEmptySpot, colEmptySpot, rowChosenSpot, colChosenSpot) {

    document.getElementById(items[rowEmptySpot][colEmptySpot].spot).style.backgroundImage = `url(sliding-puzzle/images/${rowLength}/${imageChoice}/${items[rowChosenSpot][colChosenSpot].card}.webp)`;
    document.getElementById(items[rowEmptySpot][colEmptySpot].spot).style.visibility = "visible";
    
    items[rowEmptySpot][colEmptySpot].card = items[rowChosenSpot][colChosenSpot].card;
    items[rowEmptySpot][colEmptySpot].empty = false;

    document.getElementById(items[rowChosenSpot][colChosenSpot].spot).style.visibility = "hidden";
    items[rowChosenSpot][colChosenSpot].card = 0;
    items[rowChosenSpot][colChosenSpot].empty = true;

    moves ++;
    document.getElementById('movesCounter').innerHTML = `Moves: ${moves}`;    
  }


function switchPieces(row, col) {  // coordinates of the clicked spot
    // check if the empty spot is above
    if (row > 0 && items[row - 1][col].empty == true) {
        change(row - 1, col, row, col);
    // check if the empty spot is below    
    } else if (row < rowLength - 1 && items[row + 1][col].empty == true) {
        change(row + 1, col, row, col);
    // check if the empty spot is left     
    } else if (col > 0 && items[row][col - 1].empty == true) {
        change(row, col - 1, row, col);
    // check if the empty spot is right    
    } else if (col < rowLength - 1 && items[row][col + 1].empty == true) {
        change(row, col + 1, row, col);
    } 
}


function mixPieces() {
    document.getElementById('finishedPicture').style.display = 'none'; 
    document.getElementById('newGame').innerHTML = 'new Game';
    let counter = 0;
    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < rowLength; j++) {
            document.getElementById(items[i][j].spot).style.backgroundImage = `url(sliding-puzzle/images/${rowLength}/${imageChoice}/${counter}.webp)`;
            items[i][j].empty = false;
            items[i][j].card = [counter];
            document.getElementById(items[i][j].spot).style.visibility = "visible";
            counter++;
        }  
    }

    document.getElementById(items[0][0].spot).style.visibility = "hidden";
    items[0][0].empty = true;

    let ranRow;
    let ranCol;
    for (let i = 0; i < 1000; i++) {
         ranRow = Math.floor(Math.random() * rowLength);
         ranCol = Math.floor(Math.random() * rowLength);
         switchPieces(ranRow, ranCol);
    }
    moves = 0;
    document.getElementById('movesCounter').innerHTML = 'Moves: 0';
    document.getElementById('solved').innerHTML = '';
}

function changePicture(chosen) {
    imageChoice = chosen;
    document.getElementById('ocean').style.border = ('none');
    document.getElementById('flower').style.border = ('none');
    document.getElementById('dunes').style.border = ('none');
    document.getElementById(chosen).style.border = ('5px solid red');
    mixPieces();
}

function changeBorder(size) {
    document.getElementById(`buttonSmall`).style.border = ('none');
    document.getElementById('buttonMedium').style.border = ('none');
    document.getElementById('buttonBig').style.border = ('none');
    document.getElementById(`button${size}`).style.border = ('5px solid red');
    document.getElementById('buttonSmall').style.backgroundColor = ('hsl(35, 40%, 90%)');
    document.getElementById('buttonMedium').style.backgroundColor = ('hsl(35, 40%, 90%)');
    document.getElementById('buttonBig').style.backgroundColor = ('hsl(35, 40%, 90%)');
    document.getElementById(`button${size}`).style.backgroundColor = ('hsl(35, 40%, 70%)');
}

function changeToSmall() {   
    rowLength = 3;    
    items = small;
    prepareSpots();
    mixPieces();
    changeBorder('Small');
}

function changeToMedium() {  
    rowLength = 4; 
    items = medium;
    prepareSpots();
    mixPieces(); 
    changeBorder('Medium');
}

function changeToBig() {
    rowLength = 5; 
    items = big;
    prepareSpots();
    mixPieces(); 
    changeBorder('Big');
}

newGame.onclick = function() { mixPieces(); }

ocean.onclick = function() { changePicture('ocean'); }
flower.onclick = function() { changePicture('flower'); }
dunes.onclick = function() { changePicture('dunes'); }

buttonSmall.onclick = function() { changeToSmall(); }
buttonMedium.onclick = function() { changeToMedium(); }
buttonBig.onclick = function() { changeToBig(); }

howtoplaybutton.onclick = function() {
    document.getElementById('howtoplay').style.display = "grid";
}
closehowtoplay1.onclick = function() {
    document.getElementById('howtoplay').style.display = "none";
}
closehowtoplay2.onclick = function() {
    document.getElementById('howtoplay').style.display = "none";
}

 
prepareSpots();
mixPieces();
