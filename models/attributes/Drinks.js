'use strict'
var dbF = require('../../server/dbFunctions');
var table = 'drinks';
var models  = require('../Models');
var Model   = new models; 

function Drinks(){
	this.table = table

	this.fillables = ['name', 'description', 'unit'] 	

	var protect = ['id']

}

Drinks.prototype = new dbF(table);
var xDrinks = new Drinks;


xDrinks.get = function(req, callback){
	Drinks.prototype.find('all', function(data){
		callback(null, data)
	})
}

module.exports = xDrinks
