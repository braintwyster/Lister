$(function(){
	var socket 			= io.connect(),
		$listerMenu 	= $('#_lister_menu'),
		$listerMenuData	= $('#_lister_menu_data'),
		$listerData		= $('#_lister_data'),
		$publicDisplay  = $('#_display_lister_public'),
		$listHeader 	= $('#_lister_header'),
		$exit 			= $('#_exit_lister_display'),
		$listerID

	socket.emit('get listers')

	socket.on('lister data', function(data){
		var html = ''
		for(i =0; i < data.length; i++){
			html += '<li class="btn btn-primary _list_item" id="'+data[i].id+'" data-name="'+data[i].name+'">'+data[i].name+'</li>'
		}
		$listerMenuData.html(html)
	})

////HANDLE ITEMS
	$listerMenuData.on("click", "._list_item", function(event){
		$listerID = this.id
		$listerData.html('')
		$listHeader.html('')
		$listHeader.html(event.target.dataset.name)
		$publicDisplay.slideDown()
	    socket.emit('get this lister', $listerID)
	    socket.emit('connect lister', $listerID)
	})

////SHOW AND HIDE EXIT BUTTON ON MOUSE MOVES AND STOPS
	var timeoutid = 0;
	$publicDisplay.mousemove(function(){
		$exit.fadeIn()
		clearTimeout(timeoutid);
    	timeoutid = setTimeout(function(){
    		$exit.fadeOut()
    	}, 5000);
	})
///////////////////

	$exit.click(function(){
		// alert($listerID)
		socket.emit('exit public', $listerID)
		$publicDisplay.slideUp()
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