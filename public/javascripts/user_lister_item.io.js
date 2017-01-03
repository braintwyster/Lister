$(function(){
	var socket 			= io.connect(),
		$addDiv 		= $('#_add_items'),
		$addForm		= $('#_adding_item_form'),
		$addAttrBtn		= $('#_add_attr_btn'),
		$attrChoice		= $('#_attr_choice'),
		$attrs			= $('#_attrs'),
		$attrCount 		= 0,
		$attrSelector 	= $('#_attr_choice_selector'), 	
		$attrData 		= $('#_attr_choice_data'),
		$attrAddBtn 	= $('#_pick_new_attr'),
		$attrMsg 		= $('#_attr_msg') 	
		$preCheck 		= {
			'image':{max:5, added:0},
			'rating':{max:1, added:0},
			'quantity':{max:1, added:0},
			'price':{max:1, added:0},
			'pages':{max:1, added:0},
			'releasedate':{max:1, added:0},
			'genre':{max:1, added:0},
			'subgenre':{max:2, added:0},
			'publisher':{max:1, added:0},
			'author':{max:1, added:0},
			'abv':{max:1, added:0},
			'ibu':{max:1, added:0},
			'breweryname':{max:1, added:0},
			'volume':{max:1, added:0},
			'thc':{max:1, added:0},
			'cbd':{max:1, added:0},
			'strain':{max:1, added:0},
			'consumptiontype':{max:1, added:0},
			'grower':{max:1, added:0},
			'weight':{max:1, added:0}
		}
	$addAttrBtn.click(function(e){
		e.preventDefault()
	    socket.emit('get add attr')
	})

	socket.on('attr catagories', function(data){
		var html = ''
		for(var i = 0; i< data.length; i++){
			html += '<option value="'+data[i]+'">'+data[i]+'</option>'
		}
		$attrSelector.html(html)
		$attrChoice.slideDown()
		$attrSelector.fadeIn()
	})
	$attrSelector.change(function(){
		socket.emit('get attr options', $(this).val())
	})

	socket.on('new attr table', function(data){
		var html = '<option>-- Choose --</option>';
		for(var i = 0; i< data.length; i++){
			html += '<option value="'+data[i].id+'" data-name="'+data[i].name+'" data-unit="'+data[i].unit+'" data-placeholder="'+data[i].placeholder+'">'+data[i].name+'</option>'
		}
		$attrData.html(html).delay(200).slideDown()
	})

	$attrData.change(function(){
		$attrAddBtn.fadeIn()
	})

	function preCheck(set, precheck){
		var check = precheck[set]

		if(check.added == check.max){
			$attrChoice.append('<div id="_attr_msg" class="alert alert-danger">'+
								'Only '+check.max+' '+set+'(s) can be added.'+
							'</div>')
			$('#_attr_msg').fadeIn().delay(3000).fadeOut()
			return false
		}
		
		check.added++
		return true
	}

	$attrAddBtn.click(function(e){
		e.preventDefault()

		var $table 		= $attrSelector.val().toLowerCase()
		var	$tableVal 	= $attrData.val()
		var	$optionData = $attrData[0].selectedOptions[0].dataset
		var $name 	= $optionData.name.toLowerCase()
		var $set 	= $name
			$set 	= $set.replace(' ', '')
			$set 	= $set.replace('-', '')
			console.log($set)
		if(!preCheck($set, $preCheck)){
			return
		}
		var $added = $preCheck[$set]
	
		$attrAddBtn.fadeOut()
		if($set != 'image')
			$attrCount++

		$attrs.append('<input type="hidden" class="form-control _attr_input" name="'+$set+'_'+$added.added+'_unit" value="'+$optionData.unit+'">')
		$attrs.append('<input type="text" class="form-control _attr_input" name="'+$set+'_'+$added.added+'" placeholder="'+$optionData.placeholder+'">')
		
		if($attrCount === 5){	 		
			$attrChoice.html('<div id="_attr_msg" class="alert alert-danger">Only 5 attributes are allowed per item.</div>')
			$('#_attr_msg').fadeIn()
			$addAttrBtn.fadeOut()
			return
		}else{
			$attrChoice.slideUp()
		}
	})
})






