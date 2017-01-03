var knex 	= require('./db')
var mysql   = require('mysql');
var con 	= mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'lister'
});

function DBFuncitons(table){
	this.table = table
	this.find = function(req, callback){
		if(typeof req != 'object' && typeof req === 'number'){		
			knex(this.table).where({id:req}).then(function(data){
				callback(data)
			})
		}else if( typeof req == 'string'){
			if(req ==='all'){
				knex(this.table).then(function(data){
					callback(data)
				})
			}
		}else{
			return {
				where: function (req, callback){
					knex(table).where(req).then(function(data){
						callback(data)
					})
				},
				whereJoin: function (req, dataJoin, callback){
					knex(table).where(req).then(function(data){
						dataJoin.joined = data
						callback(dataJoin)
					})
				},
				option: function(req){
					return req+req
				}
			}
		}
	}
	this.create = function(req, callback){
		req.created_at = new Date()
		req.updated_at = new Date()
		knex(table).insert(req).then(function(data){
			callback(null, data)
		})
	}
}
module.exports = DBFuncitons
