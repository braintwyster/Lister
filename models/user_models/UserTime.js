'use strict'
var dbF = require('../../server/dbFunctions');
var table = 'user_time';

function UserTime(){
	this.table = table

}

UserTime.prototype = new dbF(table)
var xUserTime = new UserTime

module.exports = xUserTime