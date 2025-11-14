import express, { type Request, type Response } from 'express';

const app = express();
const PORT = 8080;

enum Gender {
    Male = "MALE",
    Female = "FEMALE",
    Others = "OTHERS"
}
interface item {
    id: number;
    name: string;
    gender: Gender;
}

let items = [
    { id: 1, name: "Naveen", gender: Gender.Male},
    { id: 2, name: "Sanya", gender: Gender.Female},
    { id: 3, name: "Raghav", gender: Gender.Male},
    { id: 4, name: "Jeetum", gender: Gender.Others},
    { id: 5, name: "Mahesh", gender: Gender.Male},
] as item[]

app.use(express.json())

app.get('/users', (request : Request, response: Response) => {
    console.log("GET: all the users")
    response.status(201).json(items)
});

app.get('/users/:id', (req: Request, res: Response) => {
    const itemId = parseInt(req.params.id? req.params.id: "0")
    const getID = items.findIndex(item => item.id === itemId);
    console.log(`GET Id user of ID: ${itemId}`)
    res.status(201).json(items[getID])
})

app.post('/users/user', (req:Request, res: Response) => {
    const lastIndex = items.length;
    const name = req.body.name;
    const gender = req.body.gender;

    let newItem = {
        id: lastIndex + 1,
        name: name,
        gender: gender,
    } as item;

    items.push(newItem);
    console.log(`New Entry posted: ${name} and ${gender}`)
    res.status(201).json(newItem);
})

app.post('/users', (req:Request, res: Response) => {
    const lastIndex = items.length;
    const name = req.query.name;
    const gender = req.query.gender;

    let newItem = {
        id: lastIndex + 1,
        name: name,
        gender: gender,
    } as item;

    items.push(newItem);
    console.log(`New Entry posted: ${name}`)
    res.status(201).json(newItem);
})

app.put('/users/user/:id', (req:Request, res: Response) => {
    const itemNo = parseInt(req.params.id!);

    const itemIndex = items.findIndex(item => item.id === itemNo);

    const updateItem = {
        id: itemNo,
        name: req.body.name,
        gender:req.body.gender,
    }

    items[itemIndex] = updateItem;
    res.status(201).json(updateItem);
    console.log(`Updated Item at index ${itemNo} with value ${req.body.name}`)
})

app.patch('/users/user/:id', (req: Request, res:Response) => {
    const itemId = parseInt(req.params.id? req.params.id : "1"); 

    const itemIndex = items.findIndex(item => item.id === itemId);

    const updatedItem = {
        id: items[itemIndex]? items[itemIndex].id : itemId, 
        name: req.body.name ? req.body.name: items[itemIndex]?.name,
        gender: req.body.gender ? req.body.gender: items[itemIndex]?.gender,
    };

    items[itemIndex] = updatedItem;
    res.status(200).json(updatedItem);
})

app.delete('/users/user/:id', (req: Request, res:Response) => {
    const itemId = parseInt(req.params.id!);

    const itemIndex = items.findIndex(item => item.id === itemId);
    const deleteItem = items[itemIndex]
    items = items.filter(item => item.id !== itemId);

    res.status(200).json(deleteItem);
})


app.listen(PORT);