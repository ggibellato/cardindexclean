import Cards from "../../src/core/entities/Cards";
import CardIndexGetCards from "../../src/data/services/CardIndexGetCards";
import TestData from "../TestData";

var cardIndexGetCards: CardIndexGetCards;

beforeEach(() => {
    cardIndexGetCards = new CardIndexGetCards();
    Cards.getInstance().reset();
    TestData.Create();
});

test("Get cards by title", function () {
    var cards = cardIndexGetCards.execute("Chicken roasted");
    expect(cards.length).toEqual(1);

    cards = cardIndexGetCards.execute("chicken");
    expect(cards.length).toEqual(2);

    cards = cardIndexGetCards.execute("Pie");
    expect(cards.length).toEqual(0);
});

test("Get cards by tags", function () {
    var cards = cardIndexGetCards.execute(null, undefined, ["chicken"]);
    expect(cards.length).toEqual(2);

     var cards = cardIndexGetCards.execute(null, undefined, ["salad"]);
     expect(cards.length).toEqual(1);

    var cards = cardIndexGetCards.execute(null, [""], ["pasta", "pie"]);
    expect(cards.length).toEqual(1);

    var cards = cardIndexGetCards.execute(null, [""], ["pasta", "salad"]);
    expect(cards.length).toEqual(2);

    var cards = cardIndexGetCards.execute(null, [""], ["pie", "pudding"]);
    expect(cards.length).toEqual(0);
});

test("Get cards by indices", function () {
    var cards = cardIndexGetCards.execute(null, ["/chicken"]);
    expect(cards.length).toEqual(2);

    var cards = cardIndexGetCards.execute(null, ["/rice"]);
    expect(cards.length).toEqual(1);

    var cards = cardIndexGetCards.execute(null, ["/beans"]);
    expect(cards.length).toEqual(0);

    var cards = cardIndexGetCards.execute(null, ["/chicken/beans"]);
    expect(cards.length).toEqual(0);
});

test("Get cards by title and indices and tags", function () {
    var cards = cardIndexGetCards.execute("ghe", ["/chicken"], ["chicken"]);
    expect(cards.length).toEqual(3);

    var cards = cardIndexGetCards.execute("potato", ["/chicken/beans"], ["pie", "pudding"]);
    expect(cards.length).toEqual(0);

    var cards = cardIndexGetCards.execute("CHICKEN", [""], ["chicken"]);
    expect(cards.length).toEqual(2);

    var cards = cardIndexGetCards.execute("CHICKEN", ["pasta"], ["chicken"]);
    expect(cards.length).toEqual(2);

    var cards = cardIndexGetCards.execute("CHICKEN", ["/pasta"], ["chicken"]);
    expect(cards.length).toEqual(3);

    var cards = cardIndexGetCards.execute("with", ["/chicken"], ["chicken"]);
    expect(cards.length).toEqual(3);

    var cards = cardIndexGetCards.execute("rice", ["/rice"], ["main"]);
    expect(cards.length).toEqual(1);

    var cards = cardIndexGetCards.execute("pudding", undefined, ["pasta"]);
    expect(cards.length).toEqual(1);

    var cards = cardIndexGetCards.execute("vegetables", undefined, ["pie"]);
    expect(cards.length).toEqual(1);
});
