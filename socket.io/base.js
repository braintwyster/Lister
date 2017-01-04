module.exports = function (io) { 
	var models  = require('../models/Models');
	var Model   = new models; 

	connections = []
	listers 	= {}
	io.sockets.on('connection', function(socket){
		connections.push(socket)
		console.log('connected: %s sockets connected', connections.length)

		//disconnect
		socket.on('disconnect', function (data) {

			Object.keys(listers).forEach(function(x){
				listers[x].socketIDs.splice(socket.id)
			})
			connections.splice(connections.indexOf(socket), 1)
			console.log("disconnected: %s sockets connected", connections.length)
		})

		socket.on('connect lister', function(lid){
			if(!listers[lid]){
				// listers.push(lid)
				listers[lid] = {socketIDs:[]}
			}
			
			listers[lid].socketIDs.push(socket.id)
			console.log(listers)
		})
		socket.on('disconnect lister', function(lid){
			if(listers[lid]){
				listers[lid].socketIDs.splice(socket.id)
			}
		})
		socket.on('update lister', function(lid){
			Model.Lister.getChild(lid, function(data){
				if(listers[lid]){
					ls = listers[lid].socketIDs
					for (var i = 0; i < ls.length; i++) {
						if(io.sockets.connected[ls[i]]){
							io.sockets.connected[ls[i]].emit('send items', data, lid, true)
						}
					}
				}
			})
		})
/////////////////////
		///Get all lister		
		socket.on('get listers', function(){
			Model.Lister.find('all', function(data){
				socket.emit('lister data', data)
			})
		})


/////////////////////
		///GET LISTER ITEMS 
		socket.on('get this lister', function(lid){
				// console.log(lid)
			Model.Lister.getChild(lid, function(data){
				socket.emit('send items', data, lid, false)
			})
		})
		
		socket.on('get attrs', function(data){
			for (var i = 0; i <data.length; i++) {
				Model.ItemAttr.find().whereJoin({item_id:data[i].id}, data[i], function(iwa){
					Model.ItemAttr.attrSorter(iwa, function(err, data){
						Model.ListerItem.displayItem(data, function(err, data){
							socket.emit('lister item data', data)	
						})
					})
				})
			}
		})
/////////////////
	///USER ListerIO Communication///
		socket.on('get my listers', function(userID){
			Model.Lister.getMyListers(userID, function(err, listers){
				if(err)
					socket.emit('create company', userID)
				else
					socket.emit('my lister data', listers)
			})
		})

		///ADDING ATTRIBUTES TO ITEM///
		socket.on('get add attr', function(){
			socket.emit('attr catagories', ['-- Choose --','General','Books','Brews','Dispensary'])
		})
		socket.on('get attr options', function(table){
			if(table == 'General'){
				Model.General.get('all', function(err, data){
					socket.emit('new attr table', data)
				})
			}
			if(table == 'Books'){
				Model.Book.get('all', function(err, data){
					socket.emit('new attr table', data)
				})
			}
			if(table == 'Brews'){
				Model.Drink.get('all', function(err, data){
					socket.emit('new attr table', data)
				})
			}
			if(table == 'Dispensary'){
				Model.Weed.get('all', function(err, data){
					socket.emit('new attr table', data)
				})
			}
		})
	///////////////////
		///Public ListerIO Communication///


	})
}













