import CardIndexRepository from "../src/data/repository/CardIndexRepository";
import CardIndexAddCard from "../src/data/services/CardIndexAddCard";


async function Create(repository: CardIndexRepository) {
    const cardIndexAddCard = new CardIndexAddCard(repository);
    await cardIndexAddCard.execute("Chicken roasted", "desc", null, null, ["/chicken/whole"], ["roast", "chicken"]);
    await cardIndexAddCard.execute("Salad with chicken", "desc", null, null, ["/Chicken/breast"], ["salad", "CHICKEN"]);
    await cardIndexAddCard.execute("Spaghetti with broccoli", "desc", null, null, ["/pasta/spaghetti/vegetables"], ["pasta"]);
    await cardIndexAddCard.execute("Rice and vegetables", "desc", null, null, ["/rice/vegetables"], ["main", "vegetarian"]);
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