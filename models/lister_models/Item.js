'use strict'
var dbF 	= require('../../server/dbFunctions');
var table 	= 'items';
function Item(){
	this.db = new dbF(table)

}

Item.prototype.getAll = function(lid, callback){
	this.db.find().where({lister_id:lid}, function(items){
		callback(null, items)
	})
}

Item.prototype.displayItem = function(data, callback){
	var item 	= data
	var attrs   = item.attrs
	var images 	= attrs.images
	var main 	= ''
	if(typeof attrs.main != 'undefined')
		main = attrs.main[0]
	var subs 	= ''
	var car 	= ''

	if(typeof attrs.subs != 'undefined'){
		for (var i = 0; i < attrs.subs.length; i++) {
			subs += attrs.subs[i]
		}
	}
	if(typeof images != 'undefined' && images.length > 1){
		var pips = ''
		var imgs = ''
		for (var i = 0; i < images.length; i++) {
			if(i==0){
				imgs +=	'<div class="item active">'+
					      images[i]+
					    '</div>';
				pips += '<li data-target="#slide'+item.id+'" data-slide-to="'+i+'" class="active"></li>';
			}else{
				imgs +=	'<div class="item">'+
					      images[i]+
					    '</div>';
				pips += '<li data-target="#slide'+item.id+'" data-slide-to="'+i+'"></li>';
			}
		}
		images = '<div id="slide'+item.id+'" class="carousel slide" data-ride="carousel">'+
					'<ol class="carousel-indicators">'+
					    pips+
					'</ol>'+
					'<div class="carousel-inner" role="listbox">'+
						imgs+
				  	'</div>'+
				'</div>';
		car = '<script type="text/javascript">$(\'#slide'+item.id+'\').carousel({interval: 4000,cycle: true});</script>';
		images = '<div class="_item_img">'+images+'</div>'
	}else if(typeof images == 'undefined' || images == '' || !images){
		images = '<div class="_item_img _no_img"></div>'
	}else{
		images = '<div class="_item_img">'+images+'</div>'
	}

	var html = '<li class="col_sm_12 _list_item" id="'+item.id+'">'+
				'<div class="_item_main_container">'+
					'<div class="_item_nd">'+	
						'<div class="_item_name">'+item.name+'</div>'+
						'<div class="_item_description">'+item.desc+'</div>'+
					'</div>'+
					'<div class="_item_data_container">'+
						images+
						'<div class="_item_attr_data">'+
							'<div class="_item_main_attrs">'+
								main+
							'</div>'+
							'<div class="_item_sub_contianer">'+
								subs+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
				car+
			'</li>';
	callback(null, html)
}

Item.prototype.createItem = function(newItemX, callback)
{
	var newItem = {lister_id:newItemX[0].value, name:newItemX[1].value, description:newItemX[2].value}
	var attrs = newItemX.splice(3)
	this.db.create(newItem, function(err, item){
		if(err){
			callback(err)
		}else{

			Object.keys(attrs).forEach(function(a){
				attrs[a].item_id = item[0]	
				var models 	= require('../Models');
				var Model   = new models; 
				Model.ItemAttr.createAttr(attrs[a], function(err, msg){
					if(err){
						callback(err)
					}else{
						callback(null, 'New item created.')
					}
				})
			})
		}
	})
}



module.exports = new Item