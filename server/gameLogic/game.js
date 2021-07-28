const Deck = require('./deck.js');

class Game {
    constructor(players) {
        this.players = players;
        this.playerCards = new Array();
        for (let i = 1; i <= players + 1; i++) {
            this.playerCards.push([]);
        }
        this.currentPlayer = 0;
        this.deck = new Deck();
        this.startGame = this.startGame.bind(this);
        
    }

    startGame() {
        for (let playerCard of this.playerCards) {
            playerCard.push(this.deck.pop());
        }
        for (let playerCard of this.playerCards) {
            playerCard.push(this.deck.pop());
        }
    }

    
}

let game = new Game(3);
game.startGame();
