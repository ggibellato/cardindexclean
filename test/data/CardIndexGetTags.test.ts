import Cards from "../../src/core/entities/Cards";
import CardIndexGetTags from "../../src/data/services/CardIndexGetTags";
import TestData from "../TestData";

test("Get Tags empty repository", () =>{
    Cards.getInstance().reset();

    const cardIndexGetTags = new CardIndexGetTags();
    var tags = cardIndexGetTags.execute();
    expect(tags).toStrictEqual([]);
});

test("Get Tags from TestData", () =>{
    Cards.getInstance().reset();
    TestData.Create();

    const cardIndexGetTags = new CardIndexGetTags();
    var tags = cardIndexGetTags.execute();
    expect(tags).toStrictEqual(TestData.Tags());
});