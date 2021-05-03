import Cards from "../../src/core/entities/Cards";
import CardIndexRepository from "../../src/data/repository/CardIndexRepository";
import CardIndexAddCard from "../../src/data/services/CardIndexAddCard";
import CardIndexRepositoryMemory from "../../src/infra/repository/CardIndexRepositoryMemory";

var cardIndexRepositoryMemory: CardIndexRepository;
var cardIndexAddCard: CardIndexAddCard;
var cards: Cards;

beforeEach( async () => {
    cards = new Cards();
    cardIndexRepositoryMemory = new CardIndexRepositoryMemory();
    cardIndexAddCard = new CardIndexAddCard(cards, cardIndexRepositoryMemory);
});

test("Can add card", async function () {
    const cardIndexRepositoryMemory = new CardIndexRepositoryMemory();
    const cardIndexAddCard = new CardIndexAddCard(cards, cardIndexRepositoryMemory);

    var card = await cardIndexAddCard.execute("a", "b", null, null);
    expect(card).not.toBeNull();

    card = await cardIndexAddCard.execute("a", "b", null, null, ["c"]);
    expect(card).not.toBeNull();

    card = await cardIndexAddCard.execute("a", "b", null, null, undefined, ["t1", "t2"]);
    expect(card).not.toBeNull();

    card = await cardIndexAddCard.execute("a", "b", null, null, ["c"], ["t1", "t2"]);
    expect(card).not.toBeNull();
});