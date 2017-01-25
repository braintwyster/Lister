var express = require('express');
var router 	= express.Router();
var models 	= require('../models/Models');
// var Model   = new models; 

////PUBLIC LISTER VIEWING
router.get('/', function(req, res, next){
	res.render('listers')
})
router.get('/crApi', function(req, res, next){

})
//////////////////////////////////////////////
////USER SIDE LISTER EDITING AND CREATING/////
router.get('/new', [Auth, isComp], function(req, res, next) {
	var cid
	if(req.company_id)
		cid = req.company_id	
	Model.ListerType.getTypes(function(types){
		Model.ListerType.displayTypes('btn', types, function(err, dis){
			var types = '<div id="_lister_types">'+
							dis+
						'</div>'
						

  			res.render('new_lister', { title: 'Name Of Lister', cid:cid, types:types});
		})
	})
});

router.post('/new', Auth, function(req, res, next){
	req.checkBody('lister_name', 'Lister Name is required').notEmpty();
	req.checkBody('lister_type', 'You need to select a Lister type').notEmpty();
	req.checkBody('company_id', 'There was a problem with Company info. Please contact support Team.').notEmpty();

	var errors = req.validationErrors()
	if(errors){
		res.render('new_lister', {
			errors:errors,
			fields:{
				lister_name:req.body.lister_name, 
				company_id:req.body.company_id,
				lister_type:req.body.lister_type
			}
		})
	}else{
		var newLister = {
			name:req.body.lister_name,
			company_id:req.body.company_id,
			lister_type_id:req.body.lister_type
		}
		Model.Lister.createLister(newLister, function(err, lister){
			if(err){
				res.render('new', {
					errors:errors,
					fields:{
						lister_name:req.body.lister_name, 
						company_id:req.body.company_id,
						lister_type:req.body.lister_type
					}
				})
			}else{	
				req.flash('success_msg', 'New lister created. Now add items to your lister.')
				res.redirect('/')
			}
		})
	}
})


router.get('/items/add/:lid', [Auth, isMine], function(req, res, next) {
	Model.Lister.listerType(req.params.lid, function(err, type){
		if(err)
			throw err
		else
			res.render('lister_items', { 
				title: 'Add items to Lister', 
				lid:req.params.lid,
				type: type,
				uid: req.user[0].id
			});
	})
});

router.post('/items', Auth, function(req, res){
	var inputs = req.body
	var errs = []

	Object.keys(inputs).forEach(function(x){
		if(x.includes("unit")){
		
		}else{
			req.checkBody(x, x+" can't be empty").notEmpty()
			if(x.includes("image")){
				req.checkBody(x, x+" must be a URL").matches('http*')
			}
			if(x.includes("rating")){
				req.checkBody(x, x+" must be between number between 1-5").isInt({min:1, max:5})
			}
			if(x.includes("quantity") || x.includes("pages")){
				req.checkBody(x, x+" must be a number").isInt()
			}
			if(x.includes("abv") || x.includes("ibu") || x.includes("volume") || x.includes("thc") || x.includes("cbd") || x.includes("weight")){
				req.checkBody(x, x+" must be a number").isFloat()
			}
			if(x.includes("date")){
				req.checkBody(x, x+" must a date (mm-dd-year)").isDate()
			}
		}
	})


	var errors = req.validationErrors()
	if(errors){
		var fields = []

		Object.keys(inputs).forEach(function(x){
			if(x.includes('lid')){
				//do nothing
			}else{
				if(x.includes('unit')){
					fields.push({name:x, value:inputs[x], type:'hidden'})
				}else{
					fields.push({name:x, value:inputs[x], type:'text'})
				}
			}
		})
		res.render('lister_items', {
			errors:errors,
			lid:req.body.lid,
			fields:fields,
			noAdd:true,
			helpers:{
				ifEq: function(a, b, c, opts) {
				    if(a == b || a == c)
				        return opts.fn(this);
				    else
				        return opts.inverse(this);
				}
			}
		})
	}else{
		var newItem = []
		var hold = null
		Object.keys(inputs).forEach(function(x){
			var task
			if(x.includes('unit')){
				hold = {name:x, value:inputs[x]}
			}else{
				var snip = x.split("_", 1)
				if(hold && hold.name.includes(snip[0])){
					task = {value:inputs[x], type:snip[0], unit:hold.value}
				}else{
					task = {value:inputs[x], type:x}
				}
				newItem.push(task)
				hold = null
			}
			
		})
		Model.ListerItem.createItem(newItem, function(err, conf){
			if(err){
				//add err
			}else{
				res.redirect('/dashboard')
				// console.log('this worked')
			}
		})
	}
})

// router.get('/*', function(req, res, next) {
// 	res.redirect('/dashboard')
// });
function isMine(req, res, next){
	Model.Lister.isMine({uid:req.user[0].id, lid:req.params.lid}, function(err, check){
		if(err){
			throw err
		}else{
			if(check){
				return next()
			}else{
				req.flash('error_msg', 'This is not your Lister.')
				res.redirect('/')
			}
		}
	})
}

function isComp(req, res, next){
	Model.Company.getByUserId(req.user[0].id, function(err, company){
		if(err){
			res.redirect('/company')
		} else{
			req.company_id = company[0].id
			return next()
		}
	})
}

function Auth(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}else{
		req.flash('error_msg', 'You must be logged in to view this page.')
		res.redirect('/users/login')
	}
}

module.exports = router;