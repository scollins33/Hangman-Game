// create globals: word bank, alphabet, wins
var ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var wordBank = ["BULBASAUR","IVYSAUR","VENUSAUR","CHARMANDER","CHARMELEON","CHARIZARD","SQUIRTLE","WARTORTLE","BLASTOISE","CATERPIE","METAPOD","BUTTERFREE","WEEDLE","KAKUNA","BEEDRILL","PIDGEY","PIDGEOTTO","PIDGEOT","RATTATA","RATICATE","SPEAROW","FEAROW","EKANS","ARBOK","PIKACHU","RAICHU","SANDSHREW","SANDSLASH","NIDORAN","NIDORINA","NIDOQUEEN","NIDORAN","NIDORINO","NIDOKING","CLEFAIRY","CLEFABLE","VULPIX","NINETALES","JIGGLYPUFF","WIGGLYTUFF","ZUBAT","GOLBAT","ODDISH","GLOOM","VILEPLUME","PARAS","PARASECT","VENONAT","VENOMOTH","DIGLETT","DUGTRIO","MEOWTH","PERSIAN","PSYDUCK","GOLDUCK","MANKEY","PRIMEAPE","GROWLITHE","ARCANINE","POLIWAG","POLIWHIRL","POLIWRATH","ABRA","KADABRA","ALAKAZAM","MACHOP","MACHOKE","MACHAMP","BELLSPROUT","WEEPINBELL","VICTREEBEL","TENTACOOL","TENTACRUEL","GEODUDE","GRAVELER","GOLEM","PONYTA","RAPIDASH","SLOWPOKE","SLOWBRO","MAGNEMITE","MAGNETON","FARFETCHD","DODUO","DODRIO","SEEL","DEWGONG","GRIMER","MUK","SHELLDER","CLOYSTER","GASTLY","HAUNTER","GENGAR","ONIX","DROWZEE","HYPNO","KRABBY","KINGLER","VOLTORB","ELECTRODE","EXEGGCUTE","EXEGGUTOR","CUBONE","MAROWAK","HITMONLEE","HITMONCHAN","LICKITUNG","KOFFING","WEEZING","RHYHORN","RHYDON","CHANSEY","TANGELA","KANGASKHAN","HORSEA","SEADRA","GOLDEEN","SEAKING","STARYU","STARMIE","MRMIME","SCYTHER","JYNX","ELECTABUZZ","MAGMAR","PINSIR","TAUROS","MAGIKARP","GYARADOS","LAPRAS","DITTO","EEVEE","VAPOREON","JOLTEON","FLAREON","PORYGON","OMANYTE","OMASTAR","KABUTO","KABUTOPS","AERODACTYL","SNORLAX","ARTICUNO","ZAPDOS","MOLTRES","DRATINI","DRAGONAIR","DRAGONITE","MEWTWO","MEW"];
var totalWins = 0;

// play pokemon theme song

// START NEW GAME
function newGame() {
    // hook the HTML elements
    var htmlWins = document.getElementById('spanWins');

    var htmlBall1 = document.getElementById('ball1');
    var htmlBall2 = document.getElementById('ball2');
    var htmlBall3 = document.getElementById('ball3');
    var htmlBall4 = document.getElementById('ball4');
    var htmlBall5 = document.getElementById('ball5');
    var htmlBall6 = document.getElementById('ball6');
    var ballArray = [htmlBall1, htmlBall2, htmlBall3, htmlBall4, htmlBall5, htmlBall6];

    var htmlBoard = document.getElementById('boardDisplay');
    var htmlHistory = document.getElementById('spanHistory');

    // set initial HTML state
    htmlWins.innerHTML = totalWins;
    htmlHistory.innerHTML = 'No misses yet...';

    // select word from word bank
    // then separate the word into characters
    // create empty guess history array
    var choiceNum = Math.floor(Math.random() * wordBank.length);
    var currentWord = wordBank[choiceNum];
    var currentChars = currentWord.split('');
    var guessHistory = [];

    // call function to make the game board
    // set game board
    var gameBoard = makeBoard(currentChars);
    var cleanBoard = cleanForDisplay(gameBoard);
    htmlBoard.innerHTML = cleanBoard;

    // Set pokeballs back to full
    var numMiss = 0;
    for (var n = 0; n < ballArray.length; n++) {
        ballArray[n].src="assets/images/pokeball-full.png";
    }

    // wait for input from user
    document.onkeyup = function(event) {
        var input = event.key.toUpperCase();

        // check if input is valid
        if (ALPHABET.indexOf(input) > -1) {

            // check if letter is in selected word
            var isChar = false;
            for (var j=0; j < currentChars.length; j++) {
                if (input === currentChars[j]) {
                    isChar = true;
                    // if it is in the word, update word display
                    gameBoard[j] = input;
                    cleanBoard = cleanForDisplay(gameBoard);
                    htmlBoard.innerHTML = cleanBoard;
                }
            }

            // if guess is wrong and has not been guessed before:
            // reduce guesses
            // add letter to history
            // replace pokeball with dead ball
            if (isChar === false && guessHistory.indexOf(input) < 0) {
                guessHistory.push(input);
                htmlHistory.innerHTML = guessHistory;

                ballArray[numMiss].src='assets/images/pokeball-empty.png';
                numMiss++;
            }

            // check for game being completed or lost
            if (gameBoard.indexOf('_') < 0) {
                // increase wins
                totalWins++;
                htmlWins.innerHTML = totalWins;

                // modify word bank and play again if words are left
                if (wordBank.length > 1) {
                    wordBank.splice(choiceNum, 1);

                    //reset game
                    newGame();
                }
                else {
                    alert('All words have been guessed. You really are the Pokemon Master!');
                }
            }
            // check if the game has been lost
            else if (numMiss > 5) {
                // play new round, don't remove word
                alert('You failed this one! Guess my new Pokemon!');
                newGame()
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

// helper function to replace all commas in game board with spaces for display
function cleanForDisplay(pBoard) {
    var cleanedString = pBoard.toString().replace(/,/g, ' ');
    return cleanedString;
}

newGame();