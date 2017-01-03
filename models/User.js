'use strict'
var dbF 	= require('../server/dbFunctions')
var bcrypt 	= require('bcryptjs')

var table 	= 'users';
//User Model
function User(){
	this.table = table
				
	this.fillables = ['username', 'name', 'email'] 	

	var protect = ['id', 'password']

}
//Add DBFunctions to Model
User.prototype = new dbF(table);
//Init User Model
var xUser 	= new User;
///Add creative Funtion to user model

function checkExists(username, email, callback){
	User.prototype.find().where({email:email}, function(user){
		if(user && user.length > 0)
			callback('Email already registered.')
	})
	User.prototype.find().where({username:username}, function(user){
		if(user && user.length > 0)
			callback('Username already in use.')
	})
	callback(null, 'Make dat shit.')
}

xUser.createUser = function(newUser, callback)
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
						User.prototype.create(newUser, function(err, user){
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

xUser.getUserByEither = function(uname_email, callback){
	var query
	if(uname_email.includes('@'))
		query = {email: uname_email}
	else
		query = {username: uname_email}

	User.prototype.find().where(query, function(user){
		if(user.length == 0){
			callback(null, false)
		}else{
			callback(null, user)
		}
	})

}

xUser.checkPassword = function(cPass, hash, callback){
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








module.exports = xUser
