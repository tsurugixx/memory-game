const gameContainer = document.getElementById("game");

//Progress tracking variables
let card = { card1: null, card2: null };
let cardsFlipped = 0;
let clickLock = false;
let matchCounter = 0;

//Set inital score values
const yourScore = document.querySelector(".scoreNum");
const highScore = document.querySelector(".highScoreNum");
let score = 0
let high = JSON.parse(localStorage.getItem("score"));
yourScore.innerText = score
highScore.innerText = high || 0;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
	

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  const deck = gameContainer.querySelectorAll("div");
  if (clickLock) return;
  if (event.target.classList.contains("flipped")) return;

  let clickedCard = event.target;
  clickedCard.style.backgroundColor = clickedCard.classList[0];
  clickedCard.classList.add("flipped");
  cardsFlipped++;

  if (cardsFlipped === 1) {
    card.card1 = clickedCard.classList[0];
  }
  else if (cardsFlipped === 2) {

    card.card2 = clickedCard.classList[0];
// Cards dont match
    if (card.card1 !== card.card2) {
      clickLock = true;
      setTimeout(function () {
        for (styles of deck) {
          if (!styles.classList.contains("matched")) {
            styles.style.backgroundColor = '';
            styles.classList.remove("flipped");
          }
          cardsFlipped = 0;
          clickLock = false;
        }
      }, 1000)
      if (score != 0) {
        score -= 250;
        yourScore.innerText = score;

      }
    }
// Cards match
    else if (card.card1 === card.card2) {
      clickLock = false;
      cardsFlipped = 0;
      matchCounter++;
      score += 1000;
      yourScore.innerText = score;

      for (styles of deck) {
        if (styles.classList.contains("flipped")) {
          styles.classList.add("matched");
        }
      }
      if (matchCounter === 5) {
        console.log('game over');
        if (score > high) {
          localStorage.setItem("score", score);
        }
        setTimeout(createGO,500);
        
      };


    }
  }
};

function createGO(){
  if (window.confirm("Game Over. \nPlay Again? ")){
   window.location.reload(); 
  }
}




// when the DOM loads
createDivsForColors(shuffledColors);
