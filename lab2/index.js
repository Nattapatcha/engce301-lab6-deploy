var users = require('./users');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1> Hello World main_server </h1>');

})

app.get('/users', function(req, res) { 
  res.json(users.findAll());
});

app.get('/user/:id', function(req, res) { 
  var id = req.params.id;
  res.json(users.findById(id));
});

app.listen(3002, () => {
  console.log('Start server at port 3002.');

})
