'use strict'
var dbF = require('../../server/dbFunctions');
var table = 'user_transactions';

function UserTrans(){
	this.db = new dbF(table)

}

module.exports = new UserTrans