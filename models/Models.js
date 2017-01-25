'use strict'
function Models(){
	
	this.Auth 		= require('./user_models/Auth');
	this.User 		= require('./user_models/User');
	this.UserTime	= require('./user_models/UserTime');
	this.UserTrans  = require('./user_models/UserTransactions');
	this.UserSub	= require('./user_models/UserSubscription');
	this.Attr 		= require('./lister_models/Attribute');
	this.Item		= require('./lister_models/Item');
	this.ItemAttr	= require('./lister_models/ItemAttrs');
	this.Position	= require('./lister_models/ItemPosition');
	this.ItemType	= require('./lister_models/ItemType');
	this.ItemCateg  = require('./lister_models/ItemCategory');
	this.Lister 	= require('./lister_models/Lister');
	this.ListerType	= require('./lister_models/ListerType');
	this.Unit	 	= require('./lister_models/Unit');
	this.Company 	= require('./user_models/Company');
	this.Location 	= require('./user_models/Location');

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