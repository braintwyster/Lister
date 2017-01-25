'use strict'
var dbF = require('../../server/dbFunctions');
var table = 'user_time';

function UserTime(){
	this.db = new dbF(table)
	
}

module.exports = new UserTime