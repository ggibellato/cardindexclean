import Card from "../../core/entities/Card";
import Cards from "../../core/entities/Cards";
import { CardIndexAddCard } from "../../core/usecases/CardIndexAddCard";
import CardIndexRepository from "../repository/CardIndexRepository";

export default class CardIndexAddCardService implements CardIndexAddCard {
    constructor(private readonly cardIndexRepository: CardIndexRepository) { }

    async execute(title: string, description: string, where: string, imageAddress: string, indices: string[] = ["/"], tags: string[] = []): Promise<Card> {
        var cards = Cards.getInstance();
        cards.addCard(title, description, where, imageAddress, indices, tags);
        const card =cards.getCard(title);
        await this.cardIndexRepository.saveCard(card.title, card.description, card.where, card.imageAddress, card.indices, card.tags);
        return card;
    }
}
