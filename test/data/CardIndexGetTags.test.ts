import Cards from "../../src/core/entities/Cards";
import CardIndexRepository from "../../src/data/repository/CardIndexRepository";
import CardIndexAddCard from "../../src/data/services/CardIndexAddCard";
import CardIndexGetTags from "../../src/data/services/CardIndexGetTags";
import CardIndexRepositoryMemory from "../../src/infra/repository/CardIndexRepositoryMemory";
import TestData from "./TestData";

var cardIndexRepositoryMemory: CardIndexRepository;
var cardIndexGetTags: CardIndexGetTags;
var cards: Cards;

beforeEach( async () => {
    cards = new Cards();
    cardIndexRepositoryMemory = new CardIndexRepositoryMemory();
    cardIndexGetTags = new CardIndexGetTags(cardIndexRepositoryMemory);
    var cardIndexAddCard = new CardIndexAddCard(cards, cardIndexRepositoryMemory);
    await TestData.Create(cardIndexAddCard);
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