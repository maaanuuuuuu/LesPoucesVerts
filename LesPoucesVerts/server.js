var express = require('express'),
plants = require('./routes/plants');
 
var app = express();

app.get('/plants', plants.findAll);
app.get('/plants/:id', plants.findById);
 
app.listen(3000);
console.log('Listening on port 3000...');