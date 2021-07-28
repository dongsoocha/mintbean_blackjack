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
        this.takeTurn = this.takeTurn.bind(this);
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

    calcScore(player) {
        let score = 0;
        let ace = false;
        this.playerCards[player].forEach(card => {
            let value = card.val;
            switch (value){
                case '1':
                    ace = true;
                    score += 11;
                    break;
                case '2':
                    score += 2;
                    break;
                case '3':
                    score += 3;
                    break;
                case '4':
                    score += 4;
                    break;
                case '5':
                    score += 5;
                    break;
                case '6':
                    score += 6;
                    break;
                case '7':
                    score += 7;
                    break;
                case '8':
                    score += 8;
                    break;
                case '9':
                    score += 9;
                    break;
                case '10':
                    score += 10;
                    break;
                case 'J':
                    score += 10;
                    break;
                case 'Q':
                    score += 10;
                    break;
                case 'K':
                    score += 10;
                    break;
            }
        })
        if (score > 21 && ace) {
            score -= 10;
        }
        
        console.log(this.playerCards[player], score);
    };
}

let game = new Game(3);
game.startGame();
game.calcScore(1);

