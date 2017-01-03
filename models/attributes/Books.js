'use strict'
var dbF = require('../../server/dbFunctions');
var table = 'books';
var models  = require('../Models');
var Model   = new models; 

function Books(){
	this.table = table

	this.fillables = ['name', 'description', 'unit'] 	

	var protect = ['id']

}

Books.prototype = new dbF(table);
var xBooks = new Books;


xBooks.get = function(req, callback){
	Books.prototype.find(req, function(data){
		callback(null, data)
	})
}

module.exports = xBooks
