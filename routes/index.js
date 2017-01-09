var express = require('express');
var router = express.Router();
var models 			= require('../models/Models');
var Model   		= new models; 

/* GET home page. */
router.get('/', AuthDash, function(req, res, next) {
  res.render('index', { title: 'DigiLister' });
});

router.get('/test', AuthDash, function(req, res, next) {
	res.send(202)
});

router.get('/dashboard', [Auth], function(req, res, next) {
  	res.render('dashboard', { user:req.user[0].id});
});

router.get('/company', Auth, function(req, res, next){
	res.render('new_company')
})

router.post('/company', Auth, function(req, res, next){
	req.checkBody('company_name', 'Company name is required').notEmpty();
	req.checkBody('location', 'Location is required. Full address or just city/state.').notEmpty();
	req.checkBody('phone', 'Phone # is required').notEmpty();
	req.checkBody('phone', 'Phone must be a USA phone #').isMobilePhone('en-US');
	var errors = req.validationErrors()
	
	if(errors){
		res.render('new_company', {
			errors:errors,
			fields:{name:req.body.company_name, location:req.body.location, phone:req.body.phone}
		})
	}else{
		var newCompany = {
			name:req.body.company_name,
			location:req.body.location,
			phone:req.body.phone,
			user_id:req.user[0].id
		}
		Model.Company.createCompany(newCompany, function(err, company){
			if(err){
				res.render('new_company', {
					errors:errors,
					fields:{name:req.body.name, location:req.body.location, phone:req.body.phone}
				})
			}else{
				cid = company[0].id;
				res.redirect('/listers/new')
			}
		})
	}
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
