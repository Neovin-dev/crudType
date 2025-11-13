import express from 'express';

const app = express();
const PORT = 3000;

let items = [
    { id: 1, name: "Naveen" },
    { id: 2, name: "Manav" },
    { id: 3, name: "Raghav" },
    { id: 4, name: "Jeetu" },
    { id: 5, name: "Mahesh" },
];

app.use(express.json());

app.get('/api/users', (request, response) => {
    console.log("hit the root");
    response.status(200)
    response.send(items);
})

app.post('/api/users/user', (request, response) => {

    let newItem = {
        id: items.length + 1,
        name: request.body.name
    }

    items.push(newItem);
    response.status(200);
    response.json(newItem);
});

app.put('/api/users/user/:id', (req, res) => {
    const itemId = parseInt(req.params.id); 

    const itemIndex = items.findIndex(item => item.id === itemId);

    const updatedItem = {
        id: itemId, 
        name: req.body.name 
    };

    items[itemIndex] = updatedItem;
    res.status(200).json(updatedItem);
});

app.patch('/api/users/user/:id', (req, res) => {
    const itemId = parseInt(req.params.id); 

    const itemIndex = items.findIndex(item => item.id === itemId);

    const updatedItem = {
        id: itemId, 
        name: req.body.name 
    };

    items[itemIndex] = updatedItem;
    res.status(200);
    response.json(updatedItem);
})

app.delete('/api/users/user/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = items.findIndex(item => item.id === itemId);

    items = items.filter(item => (item.id !== itemId));

    res.status(200).json(items);
})


app.listen(3000);