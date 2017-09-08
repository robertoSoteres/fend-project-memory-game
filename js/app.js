/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var openCards = [];
var movements = 0;
var totalCartasAbiertas = 0;
createCards();
var restart = document.querySelector('.restart');
restart.addEventListener('click', function(){    
    reset();
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length
        , temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//creamos las cartas y las barajamos
function createCards() {
    var arrayCards = [];
    document.querySelector('.moves').innerHTML = movements;
    document.querySelector('.stars').innerHTML = ''
    var deck = document.querySelector('.deck');
    var deckChildren = document.querySelector('.deck').getElementsByTagName('li');
    for (let i = 0; i < deckChildren.length; i++) {
        arrayCards.push(deckChildren[i]);
    }
    var newArrayCards = shuffle(arrayCards);
    deck.innerHTML = '';
    for (let i = 0; i < newArrayCards.length; i++) {
        deck.appendChild(newArrayCards[i]);
        displayCards(newArrayCards[i]);
    }
}

//añadimos la funcionalidad de las cartas
function displayCards(card){
    card.addEventListener('click', function(){
        if(isOpenMatch(this,'match')){
            console.log("CARTA EMPAREJADA, ESTÁ BLOQUEADA");
        }
        else{
            if(isOpenMatch(this,'open')){
                console.log("Esta carta ya está dada la vuelta");
            }
            else{
                this.className += ' open show';
                openCards.push(card);
                if (openCards.length === 2){
                    setTimeout(function(){
                        checkCards(openCards);
                        openCards.splice(0,openCards.length);                        
                    }, 600);
                }
            }
        }
    })
}

//comprobamos si las cartas coinciden
function checkCards(cards){
    var carta1 = cards[0].getElementsByTagName('i');
    var carta2 = cards[1].getElementsByTagName('i');
    
    if(carta1[0].className === carta2[0].className){
        cards[0].className = 'card match';
        cards[1].className = 'card match';
        totalCartasAbiertas +=2;
        
    }
    else{
        for(let i = 0; i < cards.length; i++){
            cards[i].className ='card';
        }
    }
    updateMovements();
}

//comprobamos si la carta ya está abierta
function isOpenMatch(card, type){
    for(let i = 0; i < card.classList.length; i++){
        if(card.classList[i] === type){
            return true;
        }
    }
    return false;
}

function reset(){
    var arrayCards = [];
    //reset count
    document.querySelector('.moves').innerHTML = 0;
    movements = 0;
    totalCartasAbiertas =0;
    //reset stars
    document.querySelector('.stars').innerHTML = '';
    
    //reset cards
    var deck = document.querySelector('.deck');
    var deckChildren = document.querySelector('.deck').getElementsByTagName('li');
    for (let i = 0; i < deckChildren.length; i++) {
        arrayCards.push(deckChildren[i]);
    }
    var newArrayCards = shuffle(arrayCards);
    deck.innerHTML = '';
    for (let i = 0; i < newArrayCards.length; i++) {
        newArrayCards[i].className = 'card';
        openCards.splice(0,openCards.length);
        deck.appendChild(newArrayCards[i]);
    }
}

function updateMovements(){
    //update count
    movements += 1;
    
    document.querySelector('.moves').innerHTML = movements;
    //update stars
    document.querySelector('.stars').innerHTML +=  '<li><i class="fa fa-star"></i></li>';
    if(movements >=8){
        comprobarCartasAbiertas(totalCartasAbiertas, movements);
    }
}


function comprobarCartasAbiertas(cartasAbiertas, moves){
    if(cartasAbiertas === 16){
    setTimeout(function(){
        alert('Congrats! You have finished the game in ' + moves + ' moves!');
    }, 300);

    }
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
