'use strict'
var dbF 	= require('../server/dbFunctions');
var table 	= 'item_attrs';
function ItemAttrs(){
	this.table = table
	this.fillables = ['value', 'type', 'unit'] 	

	var protect = ['id']

	function titleCase(str) {  
	  	str = str.toLowerCase().split(' ');

	  	for(var i = 0; i < str.length; i++){
	    	str[i] = str[i].split('');
	    	str[i][0] = str[i][0].toUpperCase(); 
	    	str[i] = str[i].join('');
	  	}
	  	return str.join(' ');
	}

	function rating(attr, clas){
		var stars = '<div class="_stars_container">'
		var substars = ''
		var empty = '' 
		var noIfSub = 'Rating'
		if(clas == 'sub'){
			noIfSub = ''
			substars = ' _sub_stars'
		}
		for (var i = 0; i < attr.value; i++) {
			stars += '<div class="_star _full_star'+substars+'"></div>'
		}
		stars += '</div>'

		return '<div class="_attr_div _'+clas+'_attr" data-type="'+attr.type+'">'+
					'<div class="_attr_unit">'+noIfSub+'</div>'+
					'<div class="_attr_val">'+stars+'</div>'+
				'</div>';
	}
	function numbers(attr, clas){
		return '<div class="_attr_div _'+clas+'_attr" data-type="'+attr.type+'">'+
					'<div class="_attr_unit">'+titleCase(attr.unit)+':</div>'+
					'<div class="_attr_val">&nbsp;'+attr.value+'</div>'+
				'</div>';
	}
	function date(attr, clas){
		var mN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var d = new Date(attr.value)
		var day = d.getDate()
		var month = mN[d.getMonth()]
		var year = d.getYear()

		var date = month + ' \'' + year
		return '<div class="_attr_div _'+clas+'_attr" data-type="'+attr.type+'">'+
					'<div class="_attr_unit">Release:</div>'+
					'<div class="_attr_val">'+date+'</div>'+
				'</div>';
	}
	function text(attr, clas){
					
		var flip = '<div class="_attr_unit">'+titleCase(attr.type)+':</div>'+
					'<div class="_attr_val">&nbsp;'+titleCase(attr.value)+'</div>'
		// if(clas == 'main')
		// 	flip = '<div class="_attr_val">'+titleCase(attr.value)+'</div>'+
		// 			'<div class="_attr_unit">'+titleCase(attr.type)+'</div>'
		return '<div class="_attr_div _'+clas+'_attr" data-type="'+attr.type+'">'+
					flip+
				'</div>';
	}
	function percent(attr, clas){
		var flip = '<div class="_attr_unit">'+attr.type.toUpperCase()+' -</div>'+
					'<div class="_attr_val">&nbsp;'+attr.value+attr.unit+'</div>'
		if(attr.type == 'price')
			flip = '<div class="_attr_unit">'+attr.type+'</div>'+
					'<div class="_attr_val">&nbsp;'+attr.unit+attr.value+'</div>'
		return '<div class="_attr_div _'+clas+'_attr" data-type="'+attr.type+'">'+
					flip+
				'</div>';
	}
	function volume(attr, clas){
		return '<div class="_attr_div _'+clas+'_attr" data-type="'+attr.type+'">'+
					'<div class="_attr_val">'+attr.value+attr.unit+'</div>'+
					// '<div class="_attr_unit">'+attr.type+'</div>'+
				'</div>';
	}
	function weight(attr, clas){
		return '<div class="_attr_div _'+clas+'_attr" data-type="'+attr.type+'">'+
					'<div class="_attr_val">'+attr.value+attr.unit+'</div>'+
					// '<div class="_attr_unit">'+attr.type+'</div>'+
				'</div>';
	}
	this.processAttr = function (attr, clas = 'sub'){
		var output
		// console.log(attr)
		if(attr.type == 'rating'){
			output = rating(attr, clas)
		}else if(attr.type == 'quantity' || attr.type == 'pages'){
			output = numbers(attr, clas)
		}else if(attr.type == 'releasedate'){
			output = date(attr, clas)
		}else if(attr.type == 'genre' || 
				attr.type == 'subgenre' || 
				attr.type == 'publisher' || 
				attr.type == 'author' || 
				attr.type == 'breweryname' || 
				attr.type == 'strain' || 
				attr.type == 'consumptiontype' || 
				attr.type == 'grower'){
			output = text(attr, clas)
		}else if(attr.type == 'abv' || attr.type == 'ibu' || attr.type == 'thc' || attr.type == 'cbd' || attr.type == 'price'){
			output = percent(attr, clas)
		}else if(attr.type == 'volume'){
			output = volume(attr, clas)
		}else if(attr.type == 'weight'){
			output = weight(attr, clas)
		}else{
			if(attr.unit == 'null')
				var unit = ''
			else
				var unit = attr.unit
			var output = '<div class="_attr_div _'+clas+'_attr" data-type="'+attr.type+'">'+
							'<div class="_attr_val">'+attr.value+'Bad moo</div>'+
							'<div class="_attr_unit">'+unit+'</div>'+
						'</div>'
		}
		return output;
	}
}

ItemAttrs.prototype = new dbF(table)
var xItemAttrs = new ItemAttrs;

xItemAttrs.attrSorter = function(iwas, callback){
	var attrs 	= iwas.joined
	iwas.attrs 	= {}
	var sort  	= iwas.attrs 
	var imgCnt 	= 0;
	var atCnt 	= 0;
	
	Object.keys(attrs).forEach(function(atk){
		var pAttr = new ItemAttrs;
		var attr = attrs[atk]

		if(!sort.images)
			sort.images = []
		if(!sort.main)
			sort.main = []
		if(!sort.subs)
			sort.subs = []

		if(attr.type == 'image'){
			var image = '<img src="'+attr.value+'" class="_img_attr">';
			sort.images.push(image)
		}else{
			atCnt++
			if(atCnt == 1){

				var main = pAttr.processAttr(attr, 'main')
				sort.main.push(main)
			}else{
				var sub = pAttr.processAttr(attr)
				sort.subs.push(sub)
			}

		}
	})
	callback(null, iwas)
}

xItemAttrs.createAttr = function(newAttr, callback)
{
	ItemAttrs.prototype.create(newAttr, function(err, item){
		if(err){
			callback(err)
		}else{
			callback(null, 'New user created.')
		}
	})
}



module.exports = xItemAttrs