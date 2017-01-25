'use strict'
var dbF = require('../../server/dbFunctions');
var table = 'lister_type';

function ListerType(){
	this.db = new dbF(table)

}

ListerType.prototype.getTypes = function(callback){
	ListerType.db.find('all', function(types){
		callback(types)
	})
}
ListerType.prototype.displayTypes = function(style, types, callback){
	var dis = ''
	for (var i = 0; i < types.length; i++) {
		dis += '<div class="_lister_type_btn" id="'+types[i].id+'">'+
						'<div class="_lister_type_name">'+
							types[i].name+
						'</div>'+
						'<div class="_lister_type_desc">'+
							types[i].desc+
						'</div>'+
					'</div>'
	}
	callback(null, dis)
}

module.exports = new ListerType