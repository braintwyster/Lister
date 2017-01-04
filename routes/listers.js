var express = require('express');
var router 	= express.Router();
var models 	= require('../models/Models');
var Model   = new models; 

////PUBLIC LISTER VIEWING
router.get('/', function(req, res, next){
	res.render('listers')
})

//////////////////////////////////////////////
////USER SIDE LISTER EDITING AND CREATING/////
router.get('/new', /*[Auth, isComp], */function(req, res, next) {
	var cid
	if(req.company_id)
		cid = req.company_id	
  	res.render('new_lister', { title: 'Name Of Lister', cid:cid});
});

router.post('/new', Auth, function(req, res, next){
	req.checkBody('lister_name', 'Lister Name is required').notEmpty();
	req.checkBody('company_id', 'There was a problem with Company info. Please contact support Team.').notEmpty();

	var errors = req.validationErrors()
	if(errors){
		res.render('new_lister', {
			errors:errors,
			fields:{lister_name:req.body.lister_name, company_id:req.body.company_id}
		})
	}else{
		var newLister = {
			name:req.body.lister_name,
			company_id:req.body.company_id
		}
		Model.Lister.createLister(newLister, function(err, lister){
			if(err){
				res.render('new', {
					errors:errors,
					fields:{lister_name:req.body.lister_name, company_id:req.body.company_id}
				})
			}else{	
				req.flash('success_msg', 'New lister created. Now add items to your lister.')
				res.redirect('items/add/'+lister[0].id)
			}
		})
	}
})


router.get('/items/add/:lid', Auth, function(req, res, next) {	
	res.render('lister_items', { 
		title: 'Add items to Lister', 
		lid:req.params.lid
	});
});

router.post('/items', function(req, res){
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