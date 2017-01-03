'use strict'
var dbF 	= require('../server/dbFunctions');
var table 	= 'lister_items';
var models 	= require('../models/Models');
var Model   = new models; 
function ListerItem(){
	this.table = table

	this.fillables = ['name', 'image', 'description'] 	

	var protect = ['id']

}

ListerItem.prototype = new dbF(table)
var xListerItem = new ListerItem

xListerItem.getItemData = function(lid, callback){
	ListerItem.prototype.find().where({lister_id:lid}, function(items){
		callback(null, items)
	})
}

xListerItem.displayItem = function(data, callback){
	var item 	= data
	var attrs   = item.attrs
	var images 	= attrs.images
	var main 	= attrs.main
	var subs 	= ''
	var car 	= ''
	
	for (var i = 0; i < attrs.subs.length; i++) {
		subs += attrs.subs[i]
	}
	if(images.length > 1){
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
	}
	var html = '<li class="col_sm_12 _list_item well" id="'+item.id+'">'+
				'<div class="_item_main_container">'+
					'<div class="_item_img">'+images+'</div>'+
					'<div class="_item_data_container">'+
						'<div class="_upper_item">'+
							'<div class="_item_nd well">'+	
								'<div class="_item_name">'+item.name+'</div>'+
								'<div class="_item_description">'+item.description+'</div>'+
							'</div>'+
							'<div class="_item_main_attrs well">'+
								main[0]+
							'</div>'+
						'</div>'+
						'<div class="_item_sub_contianer">'+
							subs+
						'</div>'+
					'</div>'+
				'</div>'+
				car+
			'</li>';
	callback(null, html)
}

xListerItem.createItem = function(newItemX, callback)
{
	var newItem = {lister_id:newItemX[0].value, name:newItemX[1].value, description:newItemX[2].value}
	var attrs = newItemX.splice(3)
	ListerItem.prototype.create(newItem, function(err, item){
		if(err){
			callback(err)
		}else{

			Object.keys(attrs).forEach(function(a){
				attrs[a].item_id = item[0]	
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



module.exports = xListerItem