'use strict'
var dbF 	= require('../../server/dbFunctions');
var models  = require('../Models');
var Model   = new models; 
var async 	= require('async')

var table 	= 'companies';

function Company(){
	this.db = new dbF(table)

}

Company.prototype.getById = function(req, callback){
	this.db.find(parseInt(req), function(company){
		callback(null, company)
	})
}

Company.prototype.getByUser = function(uid, callback){
	this.db.find().where({user_id:parseInt(uid)}, function(companies){		
		callback(companies)
	})
}

Company.prototype.createCompany = function(newCompany, callback)
{
	this.db.create(newCompany, function(err, data){
		if(err){
			callback(err)
		}else{
			callback(null, data)
		}
	})
}
module.exports = new Company

