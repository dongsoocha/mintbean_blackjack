const Deck = require('./deck.js');
const readline = require('readline');

class Game {
    constructor(players) {
        this.players = players;
        this.playerCards = new Array();
        for (let i = 1; i <= players + 1; i++) {
            this.playerCards.push([]);
        }
        this.inProgress = true;
        this.currentPlayer = 0;
        this.deck = new Deck();
        this.startGame = this.startGame.bind(this);
        this.hit = this.hit.bind(this);
        this.stand = this.stand.bind(this);
        this.endGame = this.endGame.bind(this);
    }

    startGame() {
        for (let playerCard of this.playerCards) {
            playerCard.push(this.deck.pop());
        }
        for (let playerCard of this.playerCards) {
            playerCard.push(this.deck.pop());
        }
    }

    hit() {
        this.playerCards[this.currentPlayer].push(this.deck.pop());
        let score = this.calcScore(this.currentPlayer);
        if (score >= 21) {
            this.currentPlayer++;
            if (this.currentPlayer === this.playerCards.length - 1) {
                this.endGame();
            }
        }
        console.log(score);
    }

    stand() {
        this.currentPlayer++;
        if (this.currentPlayer === this.playerCards.length - 1) {
            this.endGame();
        }
    }

    endGame() {
        let beatScore = this.calcScore(this.currentPlayer);
        // stand on 17, hit on 16 or less
        while (beatScore < 17) {
            this.playerCards[this.currentPlayer].push(this.deck.pop());
            beatScore = this.calcScore(this.currentPlayer);
        }
        for (let i = 0; i < this.playerCards.length - 1; i++) {
            let playerScore = this.calcScore(i);
            if (playerScore <= 21 && playerScore > beatScore) {
                this.playerCards[i] = 'Win';
            } else if (playerScore <= 21 && playerScore === beatScore) {
                this.playercards[i] = 'Draw';
            } else if (playerScore > 21) {
                this.playerCards[i] = 'Lose';
            } else if (beatScore > 22) {
                this.playerCards[i] = 'Win';
            }
        }
        console.log(this.playerCards);
        this.inProgress = false;
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
        return score;
    };
}
