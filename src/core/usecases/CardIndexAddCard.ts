import Card from "../entities/Card";

export interface CardIndexAddCard {
    execute(title: string, description: string, where: string, imageAddress: string, indices: string[], tags: string[]): Promise<Card>;
}
