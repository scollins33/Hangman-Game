// create globals: word bank, alphabet, wins
var ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var wordBank = ['bulbasaur', 'charmander', 'squirtle', 'pikachu'];
var wins = 0;

// play pokemon theme song

// START NEW GAME
function newGame() {
    // select word from word bank
    // then separate the word into characters
    // create empty guess history array
    var choiceNum = Math.floor(Math.random() * wordBank.length);
    var currentWord = wordBank[choiceNum];
    var currentChars = currentWord.split('');
    var guessHistory = [];

    // call function to make the game board
    var gameBoard = makeBoard(currentChars);

    // log state of game for QA
    console.log('Word Bank: ' + wordBank);
    console.log('Current Word: ' + currentWord);
    console.log('Current Chars: ' + currentChars);
    console.log('Guess History: ' + guessHistory);
    console.log('Starting Board: ' + gameBoard);

    // Set number of guesses
    // 6 guesses based on traditional hangman & pokemon allowed per trainer
    var numGuess = 6;

    // wait for input from user
    document.onkeyup = function(event) {

        // check if input is valid
        if (ALPHABET.indexOf(event.key) > -1) {

            // check if letter is in selected word
            var isChar = false;
            for (var j=0; j < currentChars.length; j++) {
                if (event.key === currentChars[j]) {
                    isChar = true;
                    // if it is in the word, update word display
                    gameBoard[j] = event.key;
                }
            }
            console.log(gameBoard);

            // if guess is wrong and has not been guessed before:
            // reduce guesses
            // add letter to history
            // replace pokeball with dead ball
            if (isChar === false && guessHistory.indexOf(event.key) < 0) {
                numGuess--;
                guessHistory.push(event.key);


            }
            console.log('History: ' + guessHistory);

            // check for game being completed or lost
            // increase wins
            // remove word from word bank
            // reset game
            if (gameBoard.indexOf('_') < 0) {
                wins++;

                // modify word bank and play again if words are left
                if (wordBank.length > 1) {
                    wordBank.splice(choiceNum, 1);
                    newGame();
                }
                else {
                    console.log('ALL WORDS GUESSED');

                    return;
                }
            }


        }
    };
}

// function to make proper number of blanks
// returns an array matching the number of letters in the word
function makeBoard(pChars) {
    var boardArray = [];
    for (var k=0; k < pChars.length; k++) {
        boardArray.push('_');
    }
    return boardArray;
}

newGame();