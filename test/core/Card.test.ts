import Card from "../../src/core/entities/Card";

test("Can create card", function () { 
    var card = new Card("Title");
    expect(card.title).toEqual("Title");
    expect(card.description).toEqual("");
    expect(card.where).toEqual("");
    expect(card.imageAddress).toEqual("");
    expect(card.indices.length).toEqual(1);
    expect(card.indices[0]).toEqual("/");
    expect(card.tags.length).toEqual(0);

    expect(() => {new Card(null)}).toThrowError();
    expect(() => {new Card(undefined)}).toThrowError();

    var card = new Card("Title", null);
    expect(card.title).toEqual("Title");
    expect(card.description).toEqual("");
    expect(card.where).toEqual("");
    expect(card.imageAddress).toEqual("");
    expect(card.indices.length).toEqual(1);
    expect(card.indices[0]).toEqual("/");
    expect(card.tags.length).toEqual(0);

    var card = new Card("Title", undefined);
    expect(card.title).toEqual("Title");
    expect(card.description).toEqual("");
    expect(card.where).toEqual("");
    expect(card.imageAddress).toEqual("");
    expect(card.indices.length).toEqual(1);
    expect(card.indices[0]).toEqual("/");
    expect(card.tags.length).toEqual(0);

    var card = new Card("Title", "description");
    expect(card.title).toEqual("Title");
    expect(card.description).toEqual("description");
    expect(card.where).toEqual("");
    expect(card.imageAddress).toEqual("");
    expect(card.indices.length).toEqual(1);
    expect(card.indices[0]).toEqual("/");
    expect(card.tags.length).toEqual(0);

    var card = new Card("Title", "description", null, null, null, null);
    expect(card.title).toEqual("Title");
    expect(card.description).toEqual("description");
    expect(card.where).toEqual("");
    expect(card.imageAddress).toEqual("");
    expect(card.indices.length).toEqual(1);
    expect(card.indices[0]).toEqual("/");
    expect(card.tags.length).toEqual(0);

    var card = new Card("Title", "description", null, null, undefined, undefined);
    expect(card.title).toEqual("Title");
    expect(card.description).toEqual("description");
    expect(card.where).toEqual("");
    expect(card.imageAddress).toEqual("");
    expect(card.indices.length).toEqual(1);
    expect(card.indices[0]).toEqual("/");
    expect(card.tags.length).toEqual(0);

    var card = new Card("Title", "description", null, null, ["/chicken/whole"], ["Roast", "CHICKEN"]);
    expect(card).not.toBeNull();
    expect(card.tags[0]).toEqual("chicken");
    expect(card.tags[1]).toEqual("roast");

    var card = new Card("Title", "description", null, null);
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

test("Can create card check tags", async function () {
    var card = new Card("a", "b", null, null, ["c"], ["AbC","ABC"]);
    expect(card.tags.length).toEqual(1);
    expect(card.tags[0]).toEqual("abc");

    var card = new Card("a", "b", null, null, ["c"], ["DEF", "cde"]);
    expect(card.tags.length).toEqual(2);
    expect(card.tags[0]).toEqual("cde");
    expect(card.tags[1]).toEqual("def");
});