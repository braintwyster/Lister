<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', 'HomeController@index');

/************ AUTH USERS CHECK **************/
Route::group(['before'=> 'auth'], function(){
	Route::get('/admin', 'AdminController@index');
	Route::get('/make', 'HomeController@make');
	Route::get('/moo', 'AdminController@employeeLogin');

	Route::get('/deleteDrink/{drinkID}', 'AdminController@deleteDrink');

	/******* CSRF CHECK FOR AUTH USERS *********/
	Route::group(['before'=>'csrf'], function(){
		Route::post('/make-employee', 'UserController@create');
		Route::post('/addDrink', 'AdminController@addDrink');
		Route::post('/addFood', 'AdminController@addFood');

	});

	/************AUTH SALES CHECK****************/
	Route::group(['before'=>'sales'], function(){
		Route::get('/sales', 'PosController@index');
	});
	/*******************************************/

	Route::get('/logout', function(){
		Auth::logout();
		return Redirect::to('/');
	});
});

/**************** CSRF CHECK ****************/
Route::group(['before'=>'csrf'], function(){

});

Route::get('/login', 'HomeController@login');
Route::post('/login', 'HomeController@loginPost');
