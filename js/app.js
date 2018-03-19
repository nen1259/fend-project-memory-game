/*
 * Create a list that holds all of your cards
 */
let clickedCardCounter = 0;
let pair = [];
let pairPosition = [];

const deckOfCards = document.querySelector(".deck");

 // let cards = ['fa-diamond',
 //                'fa-paper-plane-o',
 //                'fa-anchor',
 //                'fa-bolt',
 //                'fa-cube',
 //                'fa-leaf',
 //                'fa-bicycle',
 //                'fa-bomb',
 //                'fa-diamond',
 //                'fa-paper-plane-o',
 //                'fa-anchor',
 //                'fa-bolt',
 //                'fa-cube',
 //                'fa-leaf',
 //                'fa-bicycle',
 //                'fa-bomb'
 //              ];


 let cards = ['fa-diamond',
                'fa-diamond',
                'fa-diamond',
                'fa-diamond',
                'fa-paper-plane-o',
                'fa-paper-plane-o',
                'fa-paper-plane-o',
                'fa-paper-plane-o',
                'fa-diamond',
                'fa-diamond',
                'fa-diamond',
                'fa-diamond',
                'fa-diamond',
                'fa-diamond',
                'fa-diamond',
                'fa-diamond'
              ];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
shuffle(cards);
resetBoard();


function resetBoard(){

  // clear all child nodes from deckOfCards
  while (deckOfCards.firstChild) {
  deckOfCards.removeChild(deckOfCards.firstChild);
  }
  clickedCardCounter = 0;
  shuffle(cards);

  //setup the deckofcards
  cards.forEach(function (card,index){
    //console.log(index);
    //console.log(card);
    let listItem = document.createElement("LI");
    let item = document.createElement("I");
    listItem.appendChild(item);
    listItem.classList.add("card");
    //listItem.classList.add("open");
    //listItem.classList.add("show");

    item.classList.add("fa");
    item.classList.add(cards[index]);
    deckOfCards.appendChild(listItem);

    listItem.addEventListener('click',respondToTheClick);
  });

}

function respondToTheClick(evt){

let clickedCard = evt.target;

//clickedCard.classList.toggle("show");
if(!clickedCard.classList.contains("show") && clickedCardCounter<2){
  clickedCard.classList.add("show");
  console.log(clickedCard.classList);
  //add the selected classList to the pair array
  pair[clickedCardCounter] = clickedCard.children[0];
  console.log("pair contents");
  console.log(pair);
  clickedCardCounter++;
  console.log(clickedCardCounter);
}
if (clickedCardCounter === 2){
  //check if we have a matched pair
  // if we do reset clicked card counter and return
  console.log("time to check if we're matched");
  console.log("pair[0]");
  console.log(pair[0]);
  console.log("pair[1]");
  console.log(pair[1]);

  if (pair[0] === pair[1]){
    console.log("we have a match");
    console.log(pair.length);
    pair.pop();
    console.log(pair.length);
    pair.pop();
    console.log(pair.length);
    console.log("pair[0]");
    console.log(pair[0]);
    console.log("pair[1]");
    console.log(pair[1]);
    clickedCardCounter = 0;
    console.log(clickedCardCounter);
  }
console.log(clickedCardCounter);
}

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

    console.log("shuffle()");
    return array;
}
startTimer();

// Clock settings
const timerElement = document.getElementById('clock');
let seconds = 0;
let minutes = 0;
let hours = 0;
var timer;

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
  //timerElement.textContent = hours + ":" + minutes +":" + seconds;
  //console.log(seconds);
  startTimer();
}
function startTimer(){
  timer = setTimeout(add, 1000);
}

function stopTimer(){
  clearTimeout(timer);
}

const restartElement = document.querySelector(".restart");
restartElement.onclick = function() {
    console.log("here");
    //stopTimer(timer);
    resetTimer();
    resetBoard();
    //shuffle(cards);
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
