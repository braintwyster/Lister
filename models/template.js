'use strict'
var dbF = require('../server/dbFunctions');
var table = '~table name~';

function ModelName(){
	this.table = table

}

ModelName.prototype = new dbF(table)
var xModelName = new ModelName

module.exports = xModelName