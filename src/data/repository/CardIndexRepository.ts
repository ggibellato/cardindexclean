export default interface CardIndexRepository {
    saveCard(title: string, description: string, where: string, imageAddress: string, indices: string[], tags: string[]): Promise<null>;
}