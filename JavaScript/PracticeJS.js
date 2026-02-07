const arr = [
    {id: 1, name: "test user1", price: 20, fruit: ["apple", "mango"]},
    {id: 2, name: "test user2", price: 60, fruit: ["apple", "grapes"]}, 
    {id: 3, name: "test user3", price: 40, fruit: ["wango", "grapes"]}
]

const getValues = arr.filter((data) => data.fruit.includes("apple") && data.price > 50);
console.log(getValues)