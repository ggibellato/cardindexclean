import CardIndexRepository from "../src/data/repository/CardIndexRepository";
import CardIndexAddCard from "../src/data/services/CardIndexAddCard";
import CardIndexRepositoryMemory from "../src/infra/repository/CardIndexRepositoryMemory";

var cardIndexRepositoryMemory: CardIndexRepository;
var cardIndexAddCard: CardIndexAddCard;

beforeEach( async () => {
    cardIndexRepositoryMemory = new CardIndexRepositoryMemory();
    cardIndexAddCard = new CardIndexAddCard(cardIndexRepositoryMemory);
});

test("Can add card", async function () {
    const cardIndexRepositoryMemory = new CardIndexRepositoryMemory();
    const cardIndexAddCard = new CardIndexAddCard(cardIndexRepositoryMemory);

    var card = await cardIndexAddCard.execute("a", "b", null, null);
    expect(card).not.toBeNull();

    card = await cardIndexAddCard.execute("a", "b", null, null, ["c"]);
    expect(card).not.toBeNull();

    card = await cardIndexAddCard.execute("a", "b", null, null, undefined, ["t1", "t2"]);
    expect(card).not.toBeNull();

    card = await cardIndexAddCard.execute("a", "b", null, null, ["c"], ["t1", "t2"]);
    expect(card).not.toBeNull();
});

test("Can add card check tags", async function () {
    const cardIndexRepositoryMemory = new CardIndexRepositoryMemory();
    const cardIndexAddCard = new CardIndexAddCard(cardIndexRepositoryMemory);
    var card = await cardIndexAddCard.execute("a", "b", null, null, ["c"], ["AbC"]);
    expect(card.tags[0]).toEqual("abc");

    card = await cardIndexAddCard.execute("a", "b", null, null, ["c"], ["DEF", "cde"]);
    expect(card.tags[0]).toEqual("cde");
    expect(card.tags[1]).toEqual("def");
});