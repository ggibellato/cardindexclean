import Card from "../../core/entities/Card";
import { CardIndexAddCard } from "../../core/usecases/CardIndexAddCard";
import CardIndexRepository from "../repository/CardIndexRepository";

export default class CardIndexAddCardService implements CardIndexAddCard {
    constructor(private readonly cardIndexRepository: CardIndexRepository) { }

    async execute(title: string, description: string, where: URL, imageAddress: URL, indices: string[] = ["/"], tags: string[] = []): Promise<Card> {
        const card = new Card(title, description, where, imageAddress, indices, tags);
        await this.cardIndexRepository.saveCard(card.title, card.description, card.where, card.imageAddress, card.indices, card.tags);
        return card;
    }
}
