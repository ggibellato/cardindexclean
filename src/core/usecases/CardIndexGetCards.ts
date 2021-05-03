import Card from "../entities/Card";

export interface CardIndexGetCards {
    execute(title: string, indices: string[], tags: string[]): Card[];
}
