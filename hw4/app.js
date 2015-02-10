var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var exphbs = require("express-handlebars");
var mongoose = require('mongoose');

var routes = require('./routes/index');
mongoose.connect(process.env.MONGOURI || 'mongodb://localhost/test');

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//router
app.get('/', routes.home);
app.get('/ingredients', routes.ingredients);
app.get('/order', routes.order);
app.get('/kitchen', routes.kitchen);

//post for ingredients
app.post('/add', routes.add);
app.post('/outofstock', routes.outofstock);
app.post('/instock', routes.instock);
app.post('/edit', routes.edit);

app.listen(3000);