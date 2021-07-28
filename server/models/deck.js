class Deck {
    constructor() {
        this.cards = [];
        this.createDeck = this.createDeck.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.createDeck();
        this.shuffle();
    }

    createDeck() {
        const suits = ["spades", "clubs", "hearts", "diamonds"];
        let i = 1;
        for (let suit of suits) {
            const vals = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
            for (let val of vals) {
                this.cards.push({'val': val, 'suit': suit, 'id': i});
                i++;
            }
        }
    }

    shuffle() {
        let deck = [];
        let ids = new Set();
        while (ids.size < 52) {
            let picker = Math.round(Math.random() * 51);
            let newCard = this.cards[picker];
            if (ids.has(newCard['id'])) {
                continue;
            } else {
                deck.push(newCard);
                ids.add(newCard['id']);
            }
        }
        
        this.cards = deck;
    }

    pop() {
        return this.cards.pop();
    }
}

let deck = new Deck();
deck.pop();

module.exports = {
    Deck: Deck
};