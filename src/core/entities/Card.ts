export default class Card {
    title: string;
    description: string;
    indices: string[];
    where: URL;
    imageAddress: URL;
    tags: string[];

    constructor(title: string, description: string, where: URL, imageAddress: URL, indices: string[] = ["/"], tags: string[] = []) {
        this.title = title;
        this.description = description;
        this.indices = [...new Set(indices.map(s => s).sort((s1, s2) => { return s1.toLowerCase().localeCompare(s2.toLowerCase())}))];
        this.where = where;
        this.imageAddress = imageAddress;
        this.tags = [...new Set(tags.map(s => s.toLowerCase()).sort())];
    }

    belongsToByTitle(title: string): boolean {
        return title && this.title.toLowerCase().includes(title.toLowerCase());
    }

    belongsToByTags(tags: string[] = []): boolean {
        var lowTags = tags.map(t => t.toLowerCase());
        return this.tags.some(t => {return lowTags.includes(t)});
    }

    belongsToByIndices(indices: string[] = []): boolean {
        var lowIndices = indices.map(t => t.toLowerCase());
        return this.indices.some(i => {return lowIndices.some(li => li !== "" && i.toLowerCase().startsWith(li))});
    }
}