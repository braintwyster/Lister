'use strict'
var addVal 	= require('address-validator')
var Address = addVal.Address;
var _ 		= require('underscore');

function Location(){
	this.AddressValidator = function(address, callback){
		address = new Address(address)
		addVal.setOptions('countryMatch')
		addVal.validate(address, addVal.match.unknown, function(err, exact, inexact){
			callback(err, {exact:exact, didyou:inexact})
		});
	}
}

module.exports = new Location

