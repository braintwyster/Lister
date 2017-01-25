'use strict'
var dbF 	= require('../../server/dbFunctions')
var bcrypt 	= require('bcryptjs')
var models  = require('../Models');
var Model   = new models; 

var table 	= 'users';

function User(){
	this.db = new dbF(table);
	
	function checkExists(username, email, callback){
		this.db.find().where({email:email}, function(user){
			if(user && user.length > 0)
				callback('Email already registered.')
		})
		this.db.find().where({username:username}, function(user){
			if(user && user.length > 0)
				callback('Username already in use.')
		})
		callback(null, 'Make dat shit.')
	}

}

User.prototype.getCompanies = function(uid, callback){
	Model.Company.getByUser(uid, function(companies){
		callback(companies)
	})
}

User.prototype.createUser = function(newUser, callback)
{
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(newUser.password, salt, function(err, hash){
			if(err){ 
				callback(err)
			}else{
				newUser.password = hash
				checkExists(newUser.username, newUser.email, function(err, data){
					if(err){
						callback(err)
					}else{
						this.db.create(newUser, function(err, user){
							if(err){
								callback(err)
							}else{
								callback(null, 'New user created.')
							}
						})
					}
				})	
			}
		})
	})
}

User.prototype.getUserByEither = function(uname_email, callback){

	var query
	if(uname_email.includes('@'))
		query = {email: uname_email}
	else
		query = {username: uname_email}

	this.db.find().where(query, function(user){
		if(user.length == 0){
			callback(null, false)
		}else{
			callback(null, user)
		}
	})

}

User.prototype.checkPassword = function(cPass, hash, callback){
	bcrypt.compare(cPass, hash, function(err, isMatch){
		if(err){
			callback(err)
		}
		if(!isMatch)
			callback(null, '')
		else{
			callback(null, isMatch)
		}
	})
}

module.exports = new User
