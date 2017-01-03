$(function(){
	var socket 			= io.connect(),
		$listerMenu 	= $('#_lister_menu'),
		$listerMenuData	= $('#_lister_menu_data'),
		$listerData		= $('#_lister_data'),
		$user 			= $('#_tash')

	socket.emit('get my listers', $user.val())
	
	socket.on('my lister data', function(data){
		var html = ''
		for(i =0; i < data.length; i++){
			html += '<li class="btn btn-primary _list_item" id="'+data[i].id+'">'+data[i].name+'</li>'
		}
		// console.log(html)
		$listerMenuData.html(html)
		$listerData.html('Select a lister from the menu.')
	})

	$listerMenuData.on("click", "._list_item", function(event){
		$listerData.html('')
		$listerData.html('<a href="/listers/items/add/'+this.id+'" class="btn btn-success _add_item_btn">Add An Item</a>')
	    socket.emit('get this lister', this.id)
	})

////////////////////////
	socket.on('send items', function(data, lid){
		socket.emit('get attrs', data)
	})
////////////////////////

	socket.on('lister item data', function(data){
		$listerData.append(data)
	})
})