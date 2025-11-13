"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var PORT = 8080;
var Gender;
(function (Gender) {
    Gender["Male"] = "MALE";
    Gender["Female"] = "FEMALE";
    Gender["Others"] = "OTHERS";
})(Gender || (Gender = {}));
var items = [
    { id: 1, name: "Naveen", gender: Gender.Male },
    { id: 2, name: "Sanya", gender: Gender.Female },
    { id: 3, name: "Raghav", gender: Gender.Male },
    { id: 4, name: "Jeetum", gender: Gender.Others },
    { id: 5, name: "Mahesh", gender: Gender.Male },
];
app.use(express.json());
app.get('/users', function (request, response) {
    console.log("GET: all the users");
    response.status(201).json(items);
});
app.get('/users/:id', function (req, res) {
    var itemId = parseInt(req.params.id);
    var getID = items.findIndex(function (item) { return item.id === itemId; });
    console.log("GET Id user of ID: ".concat(itemId));
    res.status(201).json(items[getID]);
});
app.post('/users/user', function (req, res) {
    var lastIndex = items.length;
    var name = req.body.name;
    var gender = req.body.gender;
    var newItem = {
        id: lastIndex + 1,
        name: name,
        gender: gender,
    };
    items.push(newItem);
    console.log("New Entry posted: ".concat(name, " and ").concat(gender));
    res.status(201).json(newItem);
});
app.post('/users', function (req, res) {
    var lastIndex = items.length;
    var name = req.query.name;
    var gender = req.query.gender;
    var newItem = {
        id: lastIndex + 1,
        name: name,
        gender: gender,
    };
    items.push(newItem);
    console.log("New Entry posted: ".concat(name));
    res.status(201).json(newItem);
});
app.put('/users/user/:id', function (req, res) {
    var itemNo = parseInt(req.params.id);
    var itemIndex = items.findIndex(function (item) { return item.id === itemNo; });
    var updateItem = {
        id: itemNo,
        name: req.body.name,
        gender: req.body.gender,
    };
    items[itemIndex] = updateItem;
    res.status(201).json(updateItem);
    console.log("Updated Item at index ".concat(itemNo, " with value ").concat(req.body.name));
});
app.patch('/users/user/:id', function (req, res) {
    var itemId = parseInt(req.params.id);
    var itemIndex = items.findIndex(function (item) { return item.id === itemId; });
    var updatedItem = {
        id: items[itemIndex].id,
        name: req.body.name ? req.body.name : items[itemIndex].name,
        gender: req.body.gender ? req.body.gender : items[itemIndex].gender,
    };
    items[itemIndex] = updatedItem;
    res.status(200).json(updatedItem);
});
app.delete('/users/user/:id', function (req, res) {
    var itemId = parseInt(req.params.id);
    var itemIndex = items.findIndex(function (item) { return item.id === itemId; });
    var deleteItem = items[itemIndex];
    items = items.filter(function (item) { return item.id !== itemId; });
    res.status(200).json(deleteItem);
});
app.listen(PORT);
