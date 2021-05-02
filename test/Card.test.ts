import Card from "../src/core/entities/Card";

test("Can create card", function () { 
    var card = new Card("Chicken roasted", "b", null, null, ["/chicken/whole"], ["Roast", "CHICKEN"]);
    expect(card).not.toBeNull();
    expect(card.tags[0]).toEqual("chicken");
    expect(card.tags[1]).toEqual("roast");

    card = new Card("Chicken roasted", "b", null, null);
    expect(card).not.toBeNull();
    expect(card.indices.length).toEqual(1);
    expect(card.indices[0]).toEqual("/");
    expect(card.tags.length).toEqual(0);
});

test("Card belongsToByTitle", function () { 
    var card = new Card("Chicken roasted", "b", null, null, ["/chicken/whole"], ["Roast", "CHICKEN"]);

    expect(card.belongsToByTitle("roas")).toBeTruthy();
    expect(card.belongsToByTitle("en ro")).toBeTruthy();
    expect(card.belongsToByTitle("chicken")).toBeTruthy();
    expect(card.belongsToByTitle("with")).toBeFalsy();
    expect(card.belongsToByTitle("")).toBeFalsy();
});

test("Card belongsToByTags", function () { 
    var card = new Card("Chicken roasted", "b", null, null, ["/chicken/whole"], ["Roast", "CHICKEN"]);

    expect(card.belongsToByTags(["fish", "main", "roast"])).toBeTruthy();
    expect(card.belongsToByTags(["ROAST", "main"])).toBeTruthy();
    expect(card.belongsToByTags(["chicken", "main"])).toBeTruthy();
    expect(card.belongsToByTags(["chicken"])).toBeTruthy();
    expect(card.belongsToByTags(["ROAST"])).toBeTruthy();
    expect(card.belongsToByTags(["fish", "main"])).toBeFalsy();
    expect(card.belongsToByTags([""])).toBeFalsy();
});

test("Card belongsToByNodes", function () { 
    var card = new Card("Chicken roasted", "b", null, null, ["/chicken/whole", "/poultry/main"], ["Roast", "CHICKEN"]);

    expect(card.belongsToByIndices(["/"])).toBeTruthy();
    expect(card.belongsToByIndices(["/chicken"])).toBeTruthy();
    expect(card.belongsToByIndices(["/poultry/main"])).toBeTruthy();
    expect(card.belongsToByIndices(["/CHICKEN", "/poultry/MAIN"])).toBeTruthy();
    expect(card.belongsToByIndices(["/CHICKEN", "/MAIN"])).toBeTruthy();
    expect(card.belongsToByIndices(["/MAIN", "/poultry/MAIN"])).toBeTruthy();

    expect(card.belongsToByIndices(["/main"])).toBeFalsy();
    expect(card.belongsToByIndices(["/whole"])).toBeFalsy();
    expect(card.belongsToByIndices(["/whole", "/main"])).toBeFalsy();
    expect(card.belongsToByIndices(["/chicken/main"])).toBeFalsy();
    expect(card.belongsToByIndices([""])).toBeFalsy();
});