'use strict'
var dbF = require('../server/dbFunctions');
var table = 'listers';
var models  = require('./Models');
var Model   = new models; 

function Lister(){
	this.table = table

	this.fillables = ['name', 'company_id'] 	

	var protect = ['id']

	this.getChild = function(lid, callback){
		console.log(lid)
		Model.ListerItem.getItemData(lid, function(err, items){
			callback(items)
		})
	}
}

Lister.prototype = new dbF(table);
var xLister = new Lister;


xLister.getById = function(req, callback){
	Lister.prototype.find(req, function(user){
		callback(null, lister)
	})
}

xLister.getByCompany = function(req, callback){
	Lister.prototype.find().where(req, function(user){
		callback(null, lister)
	})
}

xLister.createLister = function(newLister, callback)
{
	Lister.prototype.create(newLister, function(err, data){
		if(err){
			callback(err)
		}else{
			callback(null, data)
		}
	})
}

xLister.getMyListers = function(userID, callback)
{
	Model.Company.getByUserId(userID, function(err, company){
		if(err == true){
			callback(true, 'Create company first.')
		}else{
			Lister.prototype.find().where({company_id:company[0].id},function(listers){
				callback(null, listers)
			})
		}
	})
	
}
module.exports = xLister
