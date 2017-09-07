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
                    checkCards(openCards);
                    openCards.splice(0,openCards.length);
                }
                
                /* VERSION CON setTimeOut - Al acertar, se para también, buscar otro fix    
                
                if (openCards.length === 2){
                    setTimeout(function(){ 
                        checkCards(openCards);
                        openCards.splice(0,openCards.length);
                    }, 1500);
                    
                    
                } */
            }                                                            
        }
    })
}

//comprblamos si las cartas coinciden
function checkCards(cards){
    var carta1 = cards[0].getElementsByTagName('i');
    var carta2 = cards[1].getElementsByTagName('i');
    if(carta1[0].className === carta2[0].className){
        cards[0].className = 'card match';
        cards[1].className = 'card match';
        
    }
    else{
        for(let i = 0; i < cards.length; i++){
            cards[i].className ='card';
        }
    }
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
