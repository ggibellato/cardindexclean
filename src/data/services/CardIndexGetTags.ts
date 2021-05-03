import Cards from "../../core/entities/Cards";
import { CardIndexGetTags } from "../../core/usecases/CardIndexGetTags";

export default class CardIndexGetTagsService implements CardIndexGetTags {
    constructor() { }

    execute(): string[] {
        return Cards.getInstance().getTags();
    }
}