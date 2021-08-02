const Deck = require('./deck.js');
const readline = require('readline');

class Game {
    constructor() {
        this.players = [];
        this.playerCards = [];
        this.waiting = [];
        this.leaving = [];
        this.inProgress = false;
        this.currentPlayer = 0;
        this.deck = new Deck();
        this.startGame = this.startGame.bind(this);
        this.hit = this.hit.bind(this);
        this.stand = this.stand.bind(this);
        this.endGame = this.endGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.removePlayer = this.removePlayer.bind(this);
        this.getState = this.getState.bind(this);
    }

    getState() {
        let state = {
            players: [],
            current: this.currentPlayer,
            size: this.deck.length,
        };
        for (let i = 0; i < this.players.length; i++) {
            state.players.push({
                name: this.players[i].username,
                hand: this.playerCards[i],
                avatar: this.players[i].avatar,
                cardBack: 'a0',
            })
        }
        state.players.push({
            name: 'dealer',
            hand: this.playerCards[this.playerCards.length - 1],
            avatar: 'a0',
            cardBack: 'a0',
        });
        console.log(this.deck.length);
        console.log(this.players.length);
        console.log(state);
        return state;
    }

    startGame() {
        for (let i = 1; i <= this.players.length + 1; i++) {
            this.playerCards.push([]);
        }
        this.inProgress = true;
        for (let playerCard of this.playerCards) {
            playerCard.push(this.deck.pop());
        }
        for (let playerCard of this.playerCards) {
            playerCard.push(this.deck.pop());
        }
    }

    restartGame() {
        //handle leavers
        while (this.leaving) {
            let player = this.leaving.pop();
            this.removePlayer(player);
        }
        //handle joiners up to player size 7
        while (this.players.length < 7 && this.waiting) {
            let player = this.waiting.shift();
            this.addPlayer(player);
        }

        //reset deck
        this.deck = new Deck();

        
        //reset playercards
        this.playerCards = new Array();
        for (let i = 1; i <= players.length + 1; i++) {
            this.playerCards.push([]);
        }
    }

    addPlayer(player) {
        // if players are full or game is going on, add to waiting list
        if (this.players.length === 7 || this.inProgress) {
            this.waiting.push(player);
        } else {
            this.players.push(player);
        }
    }

    removePlayer(player) {
        let newPlayers;
        if (this.inProgress) {
            this.leaving.push(player);
        } else {
            for (let i = 0; i < this.players.length; i++) {
                let user = this.players[i];
                if (user.username === player.username) {
                    newPlayers = this.players.slice(0, i).concat(this.players.slice(i + 1, this.players.length));
                    break;
                }
            }
            this.players = newPlayers;
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


let p1 = {
  username: 'p1',
  avatar: 'ao',
  cardBack: "a0",
};
let p2 = {
  username: "p2",
  avatar: "ao",
  cardBack: "a0",
};
let p3 = {
  username: "p3",
  avatar: "ao",
  cardBack: "a0",
};

let game = new Game();
game.addPlayer(p1);
game.addPlayer(p2);
game.addPlayer(p3);
game.startGame();
game.getState();

