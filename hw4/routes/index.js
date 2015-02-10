var mongoose = require('mongoose');
var Ingredients = require('./../models/ingredientmodel');
var routes = {};

routes.home = function(req, res) {
	res.render('home');
};

routes.edit = function(req, res) {
	var updated = req.body;
	Ingredients.update({'_id':updated.id}, updated, function(err, num, data) {
		res.end(JSON.stringify(updated));
	});
};

routes.ingredients = function(req, res) {
	Ingredients.find({}, function(err, data) {
		if (err) {
			console.error(err);
		}

		var instock = [];
		var outofstock = [];

		data.forEach(function(data) {
			if (data.stock) {
				instock.push(data);
			} else {
				outofstock.push(data);
			}
		});

		res.render('ingredients', 
			{'instock': formatPrice(instock), 
			'outofstock': formatPrice(outofstock)});
		});
};

routes.outofstock = function(req, res) {
// mark an ingredient out of stock
	var ingredientId = req.body.id;
	Ingredients.update({'_id':ingredientId}, {'stock':false}, function(err, num, data) {
		res.end(ingredientId);
	});
};

routes.instock = function(req, res) {
// mark an ingredient in stock
	var ingredientId = req.body.id;
	Ingredients.update({'_id':ingredientId}, {'stock':true}, function(err, num, data) {
		res.end(ingredientId);
	});
};

routes.add = function(req, res) {
	var newstuffdata = req.body;
	newstuffdata.stock = true;
	var newstuff = new Ingredients(newstuffdata);

	Ingredients.count({'name':newstuffdata.name}, function (err, count) {
		if (!count) {
			// not a duplicate - save
			newstuff.save(function(err) {
				// find in database - need _id for client-side purposes
				Ingredients.findOne(newstuffdata, function(err, data) {
					res.json(data);
				});
			});
		} else {
			// don't save duplicate
			res.end();
		}
	});
};

routes.order = function(req, res) {
	res.render('order');
};

routes.kitchen = function(req, res) {
	res.render('kitchen');
};

function formatPrice(data) {
	data.forEach(function(data) {
		data.remove();
	});


	return data.map(function(data) {
		var priceStr = data.price.toString();
		var copy = JSON.parse(JSON.stringify(data));
		copy.price = priceStr;
		return copy;
	});
}


module.exports = routes;