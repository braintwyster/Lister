<?php

class HomeController extends BaseController {

	public function index()
	{
		return View::make('home');
	}

	public function login()
	{
		return View::make('admin.login');
	}

	public function loginPost()
	{
		$admin = Input::only('name', 'password');
        if (Auth::attempt($admin)) {
        	if(Auth::user()->emp_type == 0)
	            return Redirect::to('/admin');
	        else
	            return Redirect::to('/sales');
        }else{
            return Redirect::to('/login')->withErrors('Admin Name or Password are wrong!');
        }
	}

	public function make()
	{
		return View::make('admin.make');
	}
}
