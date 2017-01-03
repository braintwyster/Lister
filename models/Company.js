'use strict'
var dbF = require('../server/dbFunctions');
var table = 'companies';

function Company(){
	this.table = table

	this.fillables = ['name', 'location', 'phone', 'author_id'] 	

	var protect = ['id']

}

Company.prototype = new dbF(table)
var xComp = new Company;

xComp.getById = function(req, callback){
	Company.prototype.find(req, function(company){
		callback(null, company)
	})
}

xComp.getByUserId = function(req, callback){
	Company.prototype.find().where({user_id:req}, function(company){		
		if(company.length == 0)
			callback(true)
		else
			callback(null, company)
	})
}

xComp.createCompany = function(newCompany, callback)
{
	Company.prototype.create(newCompany, function(err, data){
		if(err){
			callback(err)
		}else{
			callback(null, data)
		}
	})
}
module.exports = xComp