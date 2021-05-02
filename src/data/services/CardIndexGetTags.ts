import { CardIndexGetTags } from "../../core/usecases/CardIndexGetTags";
import CardIndexRepository from "../repository/CardIndexRepository";

export default class CardIndexGetTagsService implements CardIndexGetTags {
    constructor(private readonly cardIndexRepository: CardIndexRepository) { }

    async execute(): Promise<string[]> {
        const ret = await this.cardIndexRepository.getTags();
        return ret
    }
}