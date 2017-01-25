'use strict'
var dbF = require('../../server/dbFunctions');
var models  = require('../Models');
var Model   = new models; 
var async 	= require('async')

function Auth(){
	this.db = new dbF
}

Auth.prototype.User = function(uid, callback){
	Model.User.db.find(uid, function(user){
		if(user[0]){			
			Model.User.getCompanies(uid, function(companies){
				async.each(companies, function(c, next){
					Model.Lister.getByCompany(c.id, function(err, listers){
						c.listers = listers
						next()
					})
				}, function(err){
					user[0].companies = companies
					callback(user[0])
				})
			})
		}else{
			callback("No user found.", null)
		}
	})
}

module.exports = new Auth