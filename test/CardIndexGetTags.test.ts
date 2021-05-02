import CardIndexRepository from "../src/data/repository/CardIndexRepository";
import CardIndexGetTags from "../src/data/services/CardIndexGetTags";
import CardIndexRepositoryMemory from "../src/infra/repository/CardIndexRepositoryMemory";
import TestData from "./TestData";

var cardIndexRepositoryMemory: CardIndexRepository;
var cardIndexGetTags: CardIndexGetTags;

beforeEach( async () => {
    cardIndexRepositoryMemory = new CardIndexRepositoryMemory();
    cardIndexGetTags = new CardIndexGetTags(cardIndexRepositoryMemory);
    await TestData.Create(cardIndexRepositoryMemory);
});

test("Get Tags empty repository", async () =>{
    const rep = new CardIndexRepositoryMemory();
    const myGetTags = new CardIndexGetTags(rep);
    var tags = await myGetTags.execute();
    expect(tags).toStrictEqual([]);
});

test("Get Tags from TestData", async () =>{
    var tags = await cardIndexGetTags.execute();
    expect(tags).toStrictEqual(TestData.Tags());
});