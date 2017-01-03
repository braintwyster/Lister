'use strict'
var dbF = require('../server/dbFunctions');
var table = '~table name~';

function ModelName(){
	this.table = table

	this.fillables = ['~name~', '~to~', '~columns~'] 	

	var protect = ['id', '~other items to br protected~']

}

ModelName.prototype = new dbF(table)
var xModelName = new ModelName

module.exports = xModelName