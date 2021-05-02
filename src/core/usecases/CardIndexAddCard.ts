import Card from "../entities/Card";

export interface CardIndexAddCard {
    execute(title: string, description: string, where: URL, imageAddress: URL, indices: string[], tags: string[]): Promise<Card>;
}
