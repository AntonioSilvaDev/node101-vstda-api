const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
//const sampleData = require('./data');
app.use(bodyParser.json());
var mockData = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

// add your code here
app.get('/', (req, res) => {
    console.log('data sent');
    res.json('{status : ok}');
    });

app.get('/api/TodoItems', (req, res, next)=> {
        console.log('sending the data your way!');
        res.json(mockData);
        next();
    });

app.post('/api/TodoItems', (req, res) => {
    var newItem = {
        todoItemId: req.body.todoItemId,
        name: req.body.name,
        priority: req.body.priority,
        completed: req.body.completed
    };
    var found = mockData.find(o => o.todoItemId === newItem.todoItemId);
    if (found === undefined){
        mockData.push(newItem);
    }
    else {
        console.log(found);
        found.todoItemId = newItem.todoItemId,
        found.name = newItem.name, 
        found.priority =  newItem.priority,
        found.completed = newItem.completed;
        console.log(found);
    }
    res.status(201).json(newItem);   
    });

app.get('/api/TodoItems/:id', (req, res)=> {
    console.log('sending the data your way!');
    res.json((mockData[req.params.id]));
    });

app.delete('/api/Todoitems/:id', (req, res) => {
    console.log('Can I delete something')
    res.send(mockData[req.params.id]);
    })    
    
module.exports = app;
