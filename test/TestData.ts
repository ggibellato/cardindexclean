import Cards from "../src/core/entities/Cards";

function Create() {
    Cards.getInstance().addCard
    Cards.getInstance().addCard("Chicken roasted", "desc", null, null, ["/chicken/whole"], ["roast", "chicken"]);
    Cards.getInstance().addCard("Salad with chicken", "desc", null, null, ["/Chicken/breast"], ["salad", "CHICKEN"]);
    Cards.getInstance().addCard("Spaghetti with broccoli", "desc", null, null, ["/pasta/spaghetti/vegetables"], ["pasta"]);
    Cards.getInstance().addCard("Rice and vegetables", "desc", null, null, ["/rice/vegetables"], ["main", "vegetarian"]);
}

// function Nodes(): IndexNode[] {
//     return [
//         {
//             name: "chicken", children:
//                 [{ name: "whole", children: [] },
//                 { name: "breast", children: [] }]
//         },
//         {
//             name: "pasta", children:
//                 [{
//                     name: "spaghetti", children:
//                         [{ name: "vegetables", children: [] }]
//                 }]
//         },
//         {
//             name: "rice", children:
//                 [{ name: "vegetables", children: [] }]
//         }
//     ];
// }

function Tags(): string[] {
    return ["chicken", "main", "pasta", "roast", "salad", "vegetarian"];
}

export default { Create, Tags };