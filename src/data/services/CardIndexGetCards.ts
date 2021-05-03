import Card from "../../core/entities/Card";
import Cards from "../../core/entities/Cards";
import { CardIndexGetCards } from "../../core/usecases/CardIndexGetCards";

export default class CardIndexGetCardsService implements CardIndexGetCards {

    execute(title: string, indices: string[] = [], tags: string[] = []): Card[] {
        return Cards.getInstance().getCards(title, indices, tags);
    }
}
