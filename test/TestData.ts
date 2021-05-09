import Cards from "../src/core/entities/Cards";
import { Index } from "../src/core/entities/Index";

function Create() {
    Cards.getInstance().addCard
    Cards.getInstance().addCard("Chicken roasted", "desc", null, null, ["/chicken/whole"], ["roast", "chicken"]);
    Cards.getInstance().addCard("Salad with chicken", "desc", null, null, ["/Chicken/breast"], ["salad", "CHICKEN"]);
    Cards.getInstance().addCard("Spaghetti with broccoli", "desc", null, null, ["/pasta/spaghetti/vegetables"], ["pasta"]);
    Cards.getInstance().addCard("Rice and vegetables", "desc", null, null, ["/rice/vegetables"], ["main", "vegetarian"]);
}

function Indices(): Index[] {
    return [
        {
            name: "chicken", indices:
                [{ name: "whole", indices: [] },
                { name: "breast", indices: [] }]
        },
        {
            name: "pasta", indices:
                [{
                    name: "spaghetti", indices:
                        [{ name: "vegetables", indices: [] }]
                }]
        },
        {
            name: "rice", indices:
                [{ name: "vegetables", indices: [] }]
        }
    ];
}

function Tags(): string[] {
    return ["chicken", "main", "pasta", "roast", "salad", "vegetarian"];
}

export default { Create, Tags, Indices };