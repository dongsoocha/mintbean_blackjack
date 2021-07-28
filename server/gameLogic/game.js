const Deck = require('./deck.js');
const readline = require('readline');

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

    takeTurn() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })
        if (this.currentPlayer === this.players) {
            this.endRound();
        } else {
            // let score = this.calcScore(this.currentPlayer);
            let end = false;
            while (!end) {
                // let score = this.calcScore(this.currentPlayer);
                // console.log(`current score: ${score}`);
                console.log('Hit or Stand?');
                rl.on('line', move => {
                    switch (move) {
                        case 'Hit':
                            this.playerCards(this.currentPlayer).push(this.deck.pop());
                            break;
                        case 'Stand':
                            end = true;
                            break;
                    }
                    process.exit(0);
                });
            }
        }
    }

    // calcScore(player);
}

let game = new Game(3);
game.startGame();
game.takeTurn();

