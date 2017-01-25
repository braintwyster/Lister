'use strict'
var dbF = require('../../server/dbFunctions');
var models  = require('../Models');
var Model   = new models; 
var async 	= require('async')

var table = 'listers';

function Lister(){
	this.db = new dbF(table);
	
}

Lister.prototype.getItems = function(lid, callback){
	Model.Item.getAll(lid, function(err, items){
		callback(items)
	})
}

Lister.prototype.getById = function(lid, callback){
	this.db.find(parseInt(lid), function(lister){
		var L = new Lister 
		L.getItems(lid, function(items){
			lister[0].items = items
			callback(null, lister)
		})
	})
}

Lister.prototype.getByCompany = function(cid, callback){
	this.db.find().where({company_id:cid}, function(listers){
		async.each(listers, function(l, next){
			var L = new Lister
			L.getItems(l.id, function(items){
				l.items = items
				next()
			})
		},function(err){
			callback(null, listers)
		})
	})
}

Lister.prototype.isMine = function (req, callback){
	this.getById(req.lid, function(err, lister){
		if(err)
			throw err
		if(lister.length < 1){
			callback("No lister found", null)
		}else{
			Model.Company.getByUserId(req.uid, function(err, company){		
				if(err){
					throw err
				}else{
					if(lister[0].company_id == company[0].id){
						callback(null, true)
					}else{
						callback(null, false)
					}
				}
			})
		}
	})
}

Lister.prototype.listerType = function(lid, callback){
	this.getById(lid, function(err, lister){
		var ApiBtns = {
			bar:'',
			cafe:'',
			cannabis:'<button data-tid="'+lister[0].lister_type_id+'" id="_cr_api_connect_btn" class="btn btn-primary _api_connect_btn">Connect Dispensary</button>',		restaurant:''
		}
		if(err){
			callback(err)
		}else{
			switch(lister[0].lister_type_id){
				case 1:
					callback(null,  ApiBtns.bar)
					break;
				case 2:
					callback(null, ApiBtns.cafe)
					break;
				case 3:
					callback(null, ApiBtns.cannabis)
					break;
				case 4:
					callback(null, ApiBtns.restaurant)
					break;
			}
		}
	})
}


Lister.prototype.createLister = function(newLister, callback)
{
	this.db.create(newLister, function(err, data){
		if(err){
			callback(err)
		}else{
			callback(null, data)
		}
	})
}

Lister.prototype.getMyListers = function(userID, callback)
{
	Model.Company.getByUser(userID, function(companies){
		if(companies.length == 0){
			callback(true, 'Create company first.')
		}else{
			var L = new Lister
			L.db.find().where({company_id:companies[0].id},function(listers){
				callback(null, listers)
			})
		}
	})
	
}
module.exports = new Lister
