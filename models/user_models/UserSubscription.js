'use strict'
var dbF = require('../../server/dbFunctions');
var table = 'user_subscription';

function UserSub(){
	this.db = new dbF(table)

}


module.exports = new UserSub