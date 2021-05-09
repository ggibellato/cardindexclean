import Card from "./Card";
import { Index } from "./Index";

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
    indices: Index[] = [];

    addCard(title: string, description: string, where: string, imageAddress: string, indices: string[], tags: string[]): Card {
        var card = new Card(title, description, where, imageAddress, indices, tags)
        var idx = this.indexOfByTitle(card.title);
        if(idx > -1) {
            this.cards[idx] = card;
        }
        else {
            this.cards.push(card);
        }
        indices.forEach(s => {
            const sp = s.split("/").filter(e => e).map(e => e.toLowerCase());
            var owner:Index = null;
            sp.forEach(idx => {
                var el = this.indices.filter(e=> e.name == idx);
                if(el.length === 0) {
                    if(owner === null) {
                        owner = {
                            name: idx,
                            indices: []
                        }
                        this.indices.push(owner);
                    }
                    else {
                        const newIndex:Index = {
                            name: idx,
                            indices: []
                        }
                        owner.indices.push(newIndex);
                        owner = newIndex;
                    }
                }
                else {
                    owner = el[0];
                }
            })
        });
        return card;
    }

    reset() {
        this.cards = [];
        this.indices = [];
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

    getIndices(): Index[] {
        //var ret: Index[];
        //ret = [];
        return this.indices;
    }

    getCards(title: string, indices: string[] = [], tags: string[] = []): Card[] {
        return this.cards.filter(c => c.belongsToByTitle(title) || c.belongsToByIndices(indices) || c.belongsToByTags(tags));
    }

    private indexOfByTitle(title: string): number {
        return this.cards.findIndex(c => c.title.toLowerCase() === title.toLowerCase()) ;
    }
}