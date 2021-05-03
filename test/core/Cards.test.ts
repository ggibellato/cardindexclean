import Cards from "../../src/core/entities/Cards";

var cards : Cards;

beforeEach( async () => {
    cards = new Cards();
});

test("Can add card", function () { 
    cards.addCard("Chicken roasted", "desc", null, null, ["/chicken/whole"], ["roast", "chicken"]);
    expect(cards.length()).toEqual(1);
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


test("Add card same card", function () { 
    cards.addCard("Chicken roasted", "desc", null, null, ["/chicken/whole"], ["roast", "chicken"]);
    cards.addCard("Lamb roasted", "desc", null, null, ["/lamb/whole"], ["roast", "lamb"]);
    expect(cards.length()).toEqual(2);
    cards.addCard("Chicken roasted", "desc2", null, null, ["/chicken/whole"], ["roast", "chicken"]);
    expect(cards.length()).toEqual(2);

    var card = cards.getCard("Chicken roasted");
    expect(card.description).toEqual("desc2")
})
