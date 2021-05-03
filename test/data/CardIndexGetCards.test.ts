import Cards from "../../src/core/entities/Cards";
import CardIndexRepository from "../../src/data/repository/CardIndexRepository";
import CardIndexAddCard from "../../src/data/services/CardIndexAddCard";
import CardIndexGetCards from "../../src/data/services/CardIndexGetCards";
import CardIndexRepositoryMemory from "../../src/infra/repository/CardIndexRepositoryMemory";
import TestData from "./TestData";

var cardIndexRepositoryMemory: CardIndexRepository;
var cardIndexGetCards: CardIndexGetCards;
var cards: Cards;

beforeEach( async () => {
    cards = new Cards();
    cardIndexRepositoryMemory = new CardIndexRepositoryMemory();
    cardIndexGetCards = new CardIndexGetCards(cardIndexRepositoryMemory);
    var cardIndexAddCard = new CardIndexAddCard(cards, cardIndexRepositoryMemory);
    await TestData.Create(cardIndexAddCard);
});

test("Get cards by title", async function () {
    var cards = await cardIndexGetCards.execute("Chicken roasted");
    expect(cards.length).toEqual(1);

    cards = await cardIndexGetCards.execute("chicken");
    expect(cards.length).toEqual(2);

    cards = await cardIndexGetCards.execute("Pie");
    expect(cards.length).toEqual(0);
});

test("Get cards by tags", async function () {
    var cards = await cardIndexGetCards.execute(null, undefined, ["chicken"]);
    expect(cards.length).toEqual(2);

     var cards = await cardIndexGetCards.execute(null, undefined, ["salad"]);
     expect(cards.length).toEqual(1);

    var cards = await cardIndexGetCards.execute(null, [""], ["pasta", "pie"]);
    expect(cards.length).toEqual(1);

    var cards = await cardIndexGetCards.execute(null, [""], ["pasta", "salad"]);
    expect(cards.length).toEqual(2);

    var cards = await cardIndexGetCards.execute(null, [""], ["pie", "pudding"]);
    expect(cards.length).toEqual(0);
});

test("Get cards by indices", async function () {
    var cards = await cardIndexGetCards.execute(null, ["/chicken"]);
    expect(cards.length).toEqual(2);

    var cards = await cardIndexGetCards.execute(null, ["/rice"]);
    expect(cards.length).toEqual(1);

    var cards = await cardIndexGetCards.execute(null, ["/beans"]);
    expect(cards.length).toEqual(0);

    var cards = await cardIndexGetCards.execute(null, ["/chicken/beans"]);
    expect(cards.length).toEqual(0);
});

test("Get cards by title and indices and tags", async function () {
    var cards = await cardIndexGetCards.execute("ghe", ["/chicken"], ["chicken"]);
    expect(cards.length).toEqual(3);

    var cards = await cardIndexGetCards.execute("potato", ["/chicken/beans"], ["pie", "pudding"]);
    expect(cards.length).toEqual(0);

    var cards = await cardIndexGetCards.execute("CHICKEN", [""], ["chicken"]);
    expect(cards.length).toEqual(2);

    var cards = await cardIndexGetCards.execute("CHICKEN", ["pasta"], ["chicken"]);
    expect(cards.length).toEqual(2);

    var cards = await cardIndexGetCards.execute("CHICKEN", ["/pasta"], ["chicken"]);
    expect(cards.length).toEqual(3);

    var cards = await cardIndexGetCards.execute("with", ["/chicken"], ["chicken"]);
    expect(cards.length).toEqual(3);

    var cards = await cardIndexGetCards.execute("rice", ["/rice"], ["main"]);
    expect(cards.length).toEqual(1);

    var cards = await cardIndexGetCards.execute("pudding", undefined, ["pasta"]);
    expect(cards.length).toEqual(1);

    var cards = await cardIndexGetCards.execute("vegetables", undefined, ["pie"]);
    expect(cards.length).toEqual(1);
});
