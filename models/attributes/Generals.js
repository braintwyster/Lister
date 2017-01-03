'use strict'
var dbF = require('../../server/dbFunctions');
var table = 'generals';
var models  = require('../Models');
var Model   = new models; 

function Generals(){
	this.table = table

	this.fillables = ['name', 'description', 'unit'] 	

	var protect = ['id']

}

Generals.prototype = new dbF(table);
var xGenerals = new Generals;


xGenerals.get = function(req, callback){
	Generals.prototype.find(req, function(data){
		callback(null, data)
	})
}

module.exports = xGenerals
