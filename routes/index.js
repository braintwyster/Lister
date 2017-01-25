var express = require('express');
var router 	= express.Router();
var models 	= require('../models/Models');
var Model   = new models; 

/* GET home page. */
router.get('/', AuthDash, function(req, res, next) {
  res.render('index', { title: 'DigiLister' });
});

router.get('/test', AuthDash, function(req, res, next) {
	res.send(202)
});

router.get('/dashboard', [Auth], function(req, res, next) {
	Model.Auth.User(1, function(userData){
		userData.password = ''
		global.user = userData
		
		
  		res.render('dashboard', { user:req.user[0].id});
	})
});

router.get('/company', Auth, function(req, res, next){
	res.render('new_company')
})

router.post('/company', Auth, function(req, res, next){
	var newCompany = {
		name:req.body.company_name,
		address:req.body.address,
		city:req.body.city,
		state:req.body.state,
		zip:req.body.zip,
		phone:req.body.phone,
		user_id:req.user[0].id
	}

	req.checkBody('company_name', 'Company name is required').notEmpty();
	req.checkBody('address', 'Address is required.').notEmpty();
	req.checkBody('city', 'City is required.').notEmpty();
	req.checkBody('state', 'State is required.').notEmpty();
	req.checkBody('zip', 'Zip is required.').notEmpty();
	req.checkBody('zip', 'Zip Code must be a proper Zip Code (exp: 12345).').isInt({min:5})
	req.checkBody('phone', 'Phone # is required').notEmpty();
	req.checkBody('phone', 'Phone must be a USA phone #').isMobilePhone('en-US');
	var errors = req.validationErrors()
		
	if(errors){
		res.render('new_company', {
			errors:errors,
			fields:newCompany
		})
		return
	}
	var	address = {
		street:newCompany.address,
		city:newCompany.city,
		state:newCompany.state,
		postalCode:newCompany.zip,
		country:'US'
	};

	Model.Location.AddressValidator(address, function(err, location){
		if(err){
			res.render('new_company', {
				errors:err,
				fields:newCompany
			})	
		}else{
			if(location.exact.length > 0){
				Model.Company.createCompany(newCompany, function(err, company){
					if(err){
						res.render('new_company', {
							errors:errors,
							fields:newCompany
						})
					}else{
						// cid = company[0].id;
						res.redirect('/listers/new')
					}
				})
			}else{
				console.log('Did You Mean?')
			}
		}
	})
})

function Auth(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}else{
		req.flash('error_msg', 'You must be logged in to view this page.')
		res.redirect('/users/login')
	}
}
function AuthDash(req, res, next){
	if(req.isAuthenticated()){
		return res.redirect('/dashboard')
	}else{
		return next()
	}
}
module.exports = router;
