'use strict'
function Models(){
	this.User 		= require('./User')
	this.Company 	= require('./Company')
	this.Lister 	= require('./Lister')
	this.ListerItem	= require('./ListerItem')
	this.ItemAttr	= require('./ItemAttrs')
	this.General	= require('./attributes/Generals')
	this.Book		= require('./attributes/Books')
	this.Drink		= require('./attributes/Drinks')
	this.Weed		= require('./attributes/Weeds')

	this.GetAttrList= function(req, callback){
		
	}

	function optionList(attrs){
		var select = ''
		for (var i = 0; i < attrs.length; i++) {
			select += '<option value="'+attrs[i].id+'">'+attrs[i].name+'</option>'
		}
		return select
	}
}
module.exports = Models