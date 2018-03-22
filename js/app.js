/*
 * Create a list that holds all of your cards
 */
let clickedCardCounter = 0; // to track each 'go'
let moves = 0; //to keep track of total moves
let pair = []; // to keep the class of the each pair
let pairID = []; // to keep the element id of each pair
let targetPairs = 8; // to keep a track of when a game is complete
let matchedPairs = 0; // to track how many pairs are matched during a game

let seconds = 0;
let minutes = 0;
let hours = 0;
var timer;

let starsAwarded = 3;
const modal = document.getElementById('gameOverModal');
const timerElement = document.getElementById('clock');
const deckOfCards = document.querySelector(".deck");
const stars = document.querySelector(".stars");
const closeModal = document.querySelector(".close");
const restartElement = document.querySelector(".restart");
const playAgainElement = document.getElementById("playAgain");

 let cards = ['fa-diamond',
                'fa-paper-plane-o',
                'fa-anchor',
                'fa-bolt',
                'fa-cube',
                'fa-leaf',
                'fa-bicycle',
                'fa-bomb',
                'fa-diamond',
                'fa-paper-plane-o',
                'fa-anchor',
                'fa-bolt',
                'fa-cube',
                'fa-leaf',
                'fa-bicycle',
                'fa-bomb'
              ];


 /*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
shuffle(cards);
resetBoard();

restartElement.onclick = restartGame;
playAgainElement.onclick = restartGame;

function restartGame() {
    closeModal.click();
    resetTimer();
    resetBoard();
}

function resetBoard(){
  stopTimer();

  clickedCardCounter = 0;
  moves = 0;
  matchedPairs = 0;
  // reset stars
  stars.children[0].style.display="";
  stars.children[1].style.display="";
  stars.children[2].style.display="";

  // clear all child nodes from deckOfCards
  while (deckOfCards.firstChild) {
  deckOfCards.removeChild(deckOfCards.firstChild);
  }

  document.querySelector(".deck").classList.remove("game-over");
  document.querySelector(".moves").innerHTML = moves;
  timerElement.textContent = "00:00:00";

  shuffle(cards);

    //setup the deckofcards
    cards.forEach(function (card,index){

    let listItem = document.createElement("LI");
    listItem.id = "li_" + index;
    let item = document.createElement("I");
    listItem.appendChild(item);
    listItem.classList.add("card");
    item.classList.add("fa");
    item.classList.add(cards[index]);
    deckOfCards.appendChild(listItem);

    listItem.addEventListener('click',respondToTheClick);
  });

}

function respondToTheClick(evt){

  if(moves===0){
    startTimer();
  }
    let clickedCard = evt.target;

  //clickedCard.classList.toggle("show");
  if(!clickedCard.classList.contains("show") && clickedCardCounter<2){
    clickedCard.classList.add("show");
    //add the selected classList to the pair array
    pair[clickedCardCounter] = clickedCard.children[0].classList;
    pairID[clickedCardCounter] = clickedCard.id;
    clickedCardCounter++;
    moves++;
    if(moves === 25 ){
      stars.children[2].style.display="none";
      starsAwarded--;
    } else if(moves === 30){
      stars.children[1].style.display="none";
      starsAwarded--;
    } else if(moves === 35){
      stars.children[0].style.display="none";
      starsAwarded--;
    }
    //update moves taken
    document.querySelector(".moves").innerHTML = moves;
  }

  if (clickedCardCounter === 2){
    //check if we have a matched pair
    // if we do reset clicked card counter, increment matchedPairs and return

    if (pair[0].value === pair[1].value){
      //remove elements from the pair array
      pair.pop();
      pair.pop();
      matchedPairs++;
      for (let pairIDs of pairID) {
        document.getElementById(pairIDs).classList.toggle("match");
      }

      //check if the game is over
      if(targetPairs === matchedPairs){
        startDelay();
        stopTimer();
        document.querySelector(".deck").classList.add("game-over");
        showModal();
      }
    } else {
      //start delay which set these cards back to hidden
      startDelay();
    }
    clickedCardCounter = 0;
  }
}

function showModal(){
  modal.style.display = "block";
  document.getElementById("moveScore").textContent="Moves: " + moves;
  document.getElementById("timeScore").textContent="Time: " + timerElement.textContent;
  if (starsAwarded === 0) {
    document.getElementById("starScore").textContent = "None :("
  }
  document.getElementById("starScore").textContent="Stars: " + starsAwarded;

}
//handle the modal close
closeModal.onclick = function() {
  modal.style.display = "none";
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Clock settings

function resetTimer(){
  seconds = 0;
  minutes = 0;
  hours = 0;
}
function add(){

  seconds++;
  if(seconds >= 60 ){
    seconds = 0;
    minutes++;
    if(minutes >= 60){
      minutes = 0;
      hours++;
    }
  }

  // format the clock
  timerElement.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00")
                              + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00")
                              + ":" + (seconds > 9 ? seconds : "0" + seconds);
  startTimer();
}
function startTimer(){
  timer = setTimeout(add, 1000);
}

function stopTimer(){
  clearTimeout(timer);
}

function startDelay(){
  let delay = setTimeout(function(){
    for (let pairIDs of pairID) {
      document.getElementById(pairIDs).classList.toggle("show");
    }
  },  100);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
