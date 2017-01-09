'use strict'
var dbF = require('../../server/dbFunctions');
var table = 'user_subscription';

function UserSub(){
	this.table = table

}

UserSub.prototype = new dbF(table)
var xUserSub = new UserSub

module.exports = xUserSub