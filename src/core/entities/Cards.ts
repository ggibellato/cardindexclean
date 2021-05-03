import Card from "./Card";

export default class Cards {
    private static instance: Cards;

    private constructor() {}

    public static getInstance(): Cards {
        if (!Cards.instance) {
            Cards.instance = new Cards()
        }        
        return Cards.instance
    }

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

    reset() {
        this.cards = [];
    }

    length(): number {
        return this.cards.length;
    }

    exists(title: string): boolean {
        return this.indexOfByTitle(title) > -1;
    }

    getCard(title: string): Card {
        return this.cards.find(c => c.title.toLowerCase() === title.toLowerCase()) || null;
    }

    getTags(): string[] {
        return [...new Set(this.cards.map(c => c.tags).flat().sort())];
    }

    getCards(title: string, indices: string[] = [], tags: string[] = []): Card[] {
        return this.cards.filter(c => c.belongsToByTitle(title) || c.belongsToByIndices(indices) || c.belongsToByTags(tags));
    }

    private indexOfByTitle(title: string): number {
        return this.cards.findIndex(c => c.title.toLowerCase() === title.toLowerCase()) ;
    }
}