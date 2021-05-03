import Card from "../../core/entities/Card";
import Cards from "../../core/entities/Cards";
import { CardIndexGetCards } from "../../core/usecases/CardIndexGetCards";


export default class CardIndexAddCards implements CardIndexGetCards {
    constructor(private readonly cards: Cards) { }

    async execute(title: string, indices: string[] = [], tags: string[] = []): Promise<Card[]> {
        const cardsModel = await this.cardIndexRepository.getCards();
        const cards = cardsModel.map(cm => new Card(cm.title, cm.description, cm.where, cm.imageAddress, cm.indices, cm.tags))
            .filter(c => c.belongsToByTitle(title) || c.belongsToByIndices(indices) || c.belongsToByTags(tags));
        return cards;
    }
}
