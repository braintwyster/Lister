'use strict'
var dbF = require('../../server/dbFunctions');
var table = 'weeds';
var models  = require('../Models');
var Model   = new models; 

function Weeds(){
	this.table = table

	this.fillables = ['name', 'description', 'unit'] 	

	var protect = ['id']

}

Weeds.prototype = new dbF(table);
var xWeeds = new Weeds;


xWeeds.get = function(req, callback){
	Weeds.prototype.find('all', function(data){
		callback(null, data)
	})
}

module.exports = xWeeds
