import Cards from "../../src/core/entities/Cards";
import TestData from "../TestData";

var cards : Cards;

beforeEach( () => {
    cards = Cards.getInstance();
    cards.reset();
});

test("Can add card", function () { 
    cards.addCard("Chicken roasted", "desc", null, null, ["/chicken/whole"], ["roast", "chicken"]);
    expect(cards.length()).toEqual(1);
})

test("Add card same card", function () { 
    cards.addCard("Chicken roasted", "desc", null, null, ["/chicken/whole"], ["roast", "chicken"]);
    cards.addCard("Lamb roasted", "desc", null, null, ["/lamb/whole"], ["roast", "lamb"]);
    expect(cards.length()).toEqual(2);
    cards.addCard("Chicken roasted", "desc2", null, null, ["/chicken/whole"], ["roast", "chicken"]);
    expect(cards.length()).toEqual(2);

    var card = cards.getCard("Chicken roasted");
    expect(card.description).toEqual("desc2")
})

test("Exists", function() {
    expect(cards.exists("Chicken roasted")).toBeFalsy();
    cards.addCard("Chicken roasted", "desc", null, null, ["/chicken/whole"], ["roast", "chicken"]);
    expect(cards.exists("Chicken")).toBeFalsy();
    expect(cards.exists("Chicken roast")).toBeFalsy();
    expect(cards.exists("Lamb roasted")).toBeFalsy();

    expect(cards.exists("Chicken roasted")).toBeTruthy();
    expect(cards.exists("Chicken ROASTED")).toBeTruthy();
})

test("getCard", function () { 
    cards.addCard("Chicken roasted", "desc", null, null, ["/chicken/whole"], ["roast", "chicken"]);
    cards.addCard("Lamb roasted", "desc", null, null, ["/lamb/whole"], ["roast", "lamb"]);
    expect(cards.length()).toEqual(2);

    expect(cards.getCard("Lamb roasted")).not.toBeNull();
    expect(cards.getCard("Chicken roasted")).not.toBeNull();
    expect(cards.getCard("Lamb ROASTED")).not.toBeNull();
    expect(cards.getCard("chicken roasted")).not.toBeNull();
    
    expect(cards.getCard("Chicken")).toBeNull();
    expect(cards.getCard("roasted")).toBeNull();
})

test("getTags from empty cards", function () { 
    var tags = Cards.getInstance().getTags();
    expect(tags).toStrictEqual([]);
})

test("getTags from TestData", () =>{
    TestData.Create();

    var tags = Cards.getInstance().getTags();
    expect(tags).toStrictEqual(TestData.Tags());
});

test("getIndices from empty Cards", function () {
    var indices = Cards.getInstance().getIndices();
    expect(indices).toStrictEqual([]);
})

test("getIndices from TestData", () =>{
    TestData.Create();
    var cardIndices = Cards.getInstance().getIndices();
    var testData = TestData.Indices();
    expect(cardIndices).toStrictEqual(testData);
    expect(cardIndices[0]).toStrictEqual(testData[0]);
    expect(cardIndices[1]).toStrictEqual(testData[1]);
    expect(cardIndices[2]).toStrictEqual(testData[2]);
    expect(cardIndices[1].indices[0]).toStrictEqual(testData[1].indices[0]);
});


test("getCards by title", function () {
    TestData.Create();

    var cs = cards.getCards("Chicken roasted");
    expect(cs.length).toEqual(1);

    var cs = cards.getCards("chicken");
    expect(cs.length).toEqual(2);

    var cs = cards.getCards("Pie");
    expect(cs.length).toEqual(0);
});

test("getCards by tags", function () {
    TestData.Create();

    var cs = cards.getCards(null, undefined, ["chicken"]);
    expect(cs.length).toEqual(2);

     var cs = cards.getCards(null, undefined, ["salad"]);
     expect(cs.length).toEqual(1);

    var cs = cards.getCards(null, [""], ["pasta", "pie"]);
    expect(cs.length).toEqual(1);

    var cs = cards.getCards(null, [""], ["pasta", "salad"]);
    expect(cs.length).toEqual(2);

    var cs = cards.getCards(null, [""], ["pie", "pudding"]);
    expect(cs.length).toEqual(0);
});

test("getCards by indices", function () {
    TestData.Create();

    var cs = cards.getCards(null, ["/chicken"]);
    expect(cs.length).toEqual(2);

    var cs = cards.getCards(null, ["/rice"]);
    expect(cs.length).toEqual(1);

    var cs = cards.getCards(null, ["/beans"]);
    expect(cs.length).toEqual(0);

    var cs = cards.getCards(null, ["/chicken/beans"]);
    expect(cs.length).toEqual(0);
});

test("getCards by title and indices and tags", function () {
    TestData.Create();

    var cs = cards.getCards("ghe", ["/chicken"], ["chicken"]);
    expect(cs.length).toEqual(3);

    var cs = cards.getCards("potato", ["/chicken/beans"], ["pie", "pudding"]);
    expect(cs.length).toEqual(0);

    var cs = cards.getCards("CHICKEN", [""], ["chicken"]);
    expect(cs.length).toEqual(2);

    var cs = cards.getCards("CHICKEN", ["pasta"], ["chicken"]);
    expect(cs.length).toEqual(2);

    var cs = cards.getCards("CHICKEN", ["/pasta"], ["chicken"]);
    expect(cs.length).toEqual(3);

    var cs = cards.getCards("with", ["/chicken"], ["chicken"]);
    expect(cs.length).toEqual(3);

    var cs = cards.getCards("rice", ["/rice"], ["main"]);
    expect(cs.length).toEqual(1);

    var cs = cards.getCards("pudding", undefined, ["pasta"]);
    expect(cs.length).toEqual(1);

    var cs = cards.getCards("vegetables", undefined, ["pie"]);
    expect(cs.length).toEqual(1);
});
