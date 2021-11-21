/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// this is needed to update the ranking value in our build master deck function
const cardLookUp = {
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14,
};

// Build a 'master' deck of 'card' objects used to create shuffled decks
// this is now an array of objects with face and value as keys.
const masterDeck = buildMasterDeck();


/*----- app's state (variables) -----*/
// // this variable is updated in the original renderNewShuffledDeck function.
// let shuffledDeck;


// WonPiles will need to be shuffled at some point.
let pPile, pCard, pWarPile;
let cPile, cCard, cWarPile;
let pWinPile = [];
let cWinPile = [];


// I've moved this out of the getNewShuffledDeck function and made it a let variable so it can change - this doesn't actually matter. it works as a const variable as well.
const newShuffledDeck = [];


/*----- cached element references -----*/

const warEls = {
    pCard1: '',
    pCard2: '',
    pCard3: '',
    pCard4: '',
    cCard1: '',
    cCard2: '',
    cCard3: '',
    cCard4: '',
  }
  
  const pCardEl = document.getElementById('p-card1');
  const pBackEl = document.getElementById('p-pile');
  const cCardEl = document.getElementById('c-card1');
  const cBackEl = document.getElementById('c-pile');

/*----- functions -----*/
function getNewShuffledDeck() {
    // Create a copy of the masterDeck (leave masterDeck untouched!)
    const tempDeck = [...masterDeck];
    // commenting below line out temporarily as I've moved it outside of this function.
    // const newShuffledDeck = [];
    while (tempDeck.length) {
      // Get a random index for a card still in the tempDeck
      const rndIdx = Math.floor(Math.random() * tempDeck.length);
      // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
      newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    return newShuffledDeck;
  }
  
  function buildMasterDeck() {
    const deck = [];
    // Use nested forEach to generate card objects
    suits.forEach(function(suit) {
      ranks.forEach(function(rank) {
        deck.push({
          // The 'face' property maps to the library's CSS classes for cards
          face: `${suit}${rank}`,
            // this is setting the value of the rank from either the rank array or our cardLookUp object for the face cards.
          value: Number(rank) || cardLookUp[rank]
        });
      });
    });
    return deck;
  }

  function init() {
    buildMasterDeck();
    dealDeck();
    //this may need to be moved out of the init function

    // need to add render game board here. still need to write that function below.
  }  
  
  init();


  function dealDeck() {
    getNewShuffledDeck();  
    // here we are splitting the newShuffledDeck in 2 and assigning to the game piles
    pPile = newShuffledDeck.splice(0, (newShuffledDeck.length / 2))
    cPile = newShuffledDeck.splice(0, newShuffledDeck.length);
    // newShuffleDeck is now an empty array since we spliced out all the elements.
  };
  



  function handleTurn() {
      // when player clicks their card deck or play card button (this will be referenced from an event listener.)
    // check for win scenario  
    if (pPile.length === 0 || cPile.length === 0) return getWinner();
      // pull first value from player pile put it in play card array.
    // these methods are not working - pausing to continue with game logic
    pCard = pPile.shift();
    cCard = cPile.shift();
    if (pCard.value === cCard.value) return runWar;
    return pCard.value > cCard.value ? pWinPile.push(pCard, cCard) : cWinPile.push(pCard, cCard);
    };

    

    // referenced in handle turn tie scenario
    function runWar() {
        // if (pPile.length < 4) shuffleWinPile(pWinPile);
        // if (cPile.length < 4) shuffleWinPile(cWinPile);
        pWarPile = pPile.slice(0, 4);
        cWarPile = cPile.slice(0, 4);
        // it is okay for this to be push right now since the war pile will be updated when the function reruns and the old values will be updated.
        return pWarPile[3].value > cWarPile[3].value ? pWinPile.push(pWarPile, cWarPile) : cWinPile.push(pWarPile, cWarPile)
    }

    function shuffleWinPile(pile) {

    }
    
      // player1Card = player1.pile.shift();
    // computer.playCard = computer.pile.splice(0, 1);
    // console.log(player1.playCard)
    // console.log(player1.pile)
    // pull first value from computer pil and put in computer card array.
      // compare the two values.

      // find the greater value card and push both cards to the end of the winner's pile array