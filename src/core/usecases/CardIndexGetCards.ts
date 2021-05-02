import Card from "../entities/Card";

export interface CardIndexGetCards {
    execute(title: string, tags: string[]): Promise<Card[]>;
}
