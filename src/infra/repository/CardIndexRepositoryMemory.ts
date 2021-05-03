import CardIndexRepository from "../../data/repository/CardIndexRepository";
import { CardModel } from "../../data/models/CardModel";

export default class CardIndexRepositoryMemory implements CardIndexRepository {
    cards: CardModel[];

    constructor() {
        this.cards = [];
    }

    saveCard(title: string, description: string, where: string, imageAddress: string, indices: string[], tags: string[]): Promise<null> {
        const card: CardModel = {
            title: title,
            description: description,
            where: where,
            imageAddress: imageAddress,
            indices: indices,
            tags: tags
        };
        this.cards.push(card);
        return null;
    }
}