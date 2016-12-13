var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('layout');
});

app.listen(3000);
