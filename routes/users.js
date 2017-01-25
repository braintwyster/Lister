var express 		= require('express');
var router 			= express.Router();
var passport      	= require('passport');
var LocalStrategy 	= require('passport-local').Strategy;
var models 			= require('../models/Models');
var Model   		= new models; 


router.get('/subscription', function(req, res){
	res.render('subscription')
})

router.get('/register', function(req, res) {
	res.render('register')
});

router.post('/register', function(req, res) {
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords does not match').equals(req.body.password);

	var errors = req.validationErrors()
	if(errors){
		res.render('register', {
			errors:errors,
			fields:{name:req.body.name, username:req.body.username, email:req.body.email}
		})
	}else{
		var newUser = {
			name:req.body.name,
			username:req.body.username,
			email:req.body.email,
			password:req.body.password
		}

		Model.User.createUser(newUser, function(err, data){
			if(err){
				res.render('register', {
					errors:[{param:'User Exists',msg:err, value:''}],
					fields:{name:req.body.name, username:req.body.username, email:req.body.email}
				})
			}else{
				req.flash('success_msg', 'You are now registered and can login.')

				res.redirect('/users/login')
			}
		})
	}

});

router.get('/login', function(req, res) {
	res.render('login')
});

passport.use(new LocalStrategy(
	function(username_email, password, done){
		Model.User.getUserByEither(username_email, function(err, user){
			if(err) {
				done(null, false, {message: err});
			}else if(!user){
				done(null, false, {message:'Username, Email, or Password is Wrong...'})
			}else{
				Model.User.checkPassword(password, user[0].password, function(err, isMatch){
					if(err){
						done(null, false, {message: err})
					}
					if(isMatch){
						return done(null, user)
					}else{
						return done(null, false, {message: 'Username, Email, or Password is Wrong.'})
					}
				})
			}
		})
	}
))

passport.serializeUser(function(user, done) {
  	done(null, user[0].id);
});

passport.deserializeUser(function(id, done){
	Model.User.db.find(id, function(user){
		done(null, user)
	})
})

router.post('/login',
	passport.authenticate('local', 
		{
			successRedirect:'/dashboard', 
			failureRedirect:'/users/login', 
			failureFlash: true
		}
	)
);

router.get('/logout', function(req, res){
	req.logout()
	req.flash('success_msg', 'You have been looged out.')
	res.redirect('/')
})


// router.get('/*', function(req, res) {
//   res.redirect('/')
// });



module.exports = router;
