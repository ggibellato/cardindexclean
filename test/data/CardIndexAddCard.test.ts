import Cards from "../../src/core/entities/Cards";
import CardIndexRepository from "../../src/data/repository/CardIndexRepository";
import CardIndexAddCard from "../../src/data/services/CardIndexAddCard";
import CardIndexRepositoryMemory from "../../src/infra/repository/CardIndexRepositoryMemory";

var cardIndexRepositoryMemory: CardIndexRepository;
var cardIndexAddCard: CardIndexAddCard;
var cards: Cards;

beforeEach( async () => {
    cards = Cards.getInstance();
    cardIndexRepositoryMemory = new CardIndexRepositoryMemory();
    cardIndexAddCard = new CardIndexAddCard(cardIndexRepositoryMemory);
});

test("Can add card", async function () {
    var card = await cardIndexAddCard.execute("a", "b", null, null);
    expect(card).not.toBeNull();

    card = await cardIndexAddCard.execute("a", "b", null, null, ["c"]);
    expect(card).not.toBeNull();

    card = await cardIndexAddCard.execute("a", "b", null, null, undefined, ["t1", "t2"]);
    expect(card).not.toBeNull();

    card = await cardIndexAddCard.execute("a", "b", null, null, ["c"], ["t1", "t2"]);
    expect(card).not.toBeNull();
});