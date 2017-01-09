'use strict'
var dbF = require('../../server/dbFunctions');
var table = 'user_transactions';

function UserTrans(){
	this.table = table

}

UserTrans.prototype = new dbF(table)
var xUserTrans = new UserTrans

module.exports = xUserTrans