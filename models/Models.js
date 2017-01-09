'use strict'
function Models(){
	this.User 		= require('./user_models/User')
	this.UserTime	= require('./user_models/UserTime')
	this.UserTrans  = require('./user_models/UserTransactions')
	this.UserSub	= require('./user_models/UserSubscription')
	this.Company 	= require('./user_models/Company')
	this.Lister 	= require('./lister_models/Lister')
	this.ListerItem	= require('./lister_models/ListerItem')
	this.ItemAttr	= require('./lister_models/ItemAttrs')
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