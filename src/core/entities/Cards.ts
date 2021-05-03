import Card from "./Card";

export default class Cards {
    cards: Card[] = [];

    addCard(title: string, description: string, where: string, imageAddress: string, indices: string[], tags: string[]): Card {
        var card = new Card(title, description, where, imageAddress, indices, tags)
        var idx = this.indexOfByTitle(card.title);
        if(idx > -1) {
            this.cards[idx] = card;
        }
        else {
            this.cards.push(card);
        }
        return card;
    }

    length(): number {
        return this.cards.length;
    }

    exists(title: string): boolean {
        return  this.indexOfByTitle(title) > -1;
    }

    getCard(title: string): Card {
        return this.cards.find(c => c.title.toLowerCase() === title.toLowerCase()) || null;
    }

    private indexOfByTitle(title: string): number {
        return this.cards.findIndex(c => c.title.toLowerCase() === title.toLowerCase()) ;
    }
}