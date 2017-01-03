<?php

class UserController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}


	public function employees()
	{
		return View::make('admin.employees',[]);
	}



/************************************************************************/
	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		$data = Input::all();
		if($data['emp_role'] == 0){
			$rules = [
				'admin_name' 		=> 'required',
				'password' 			=> 'required',
				'name' 				=> 'required|min:2|unique:employee',
				'key' 				=> 'required|min:8',
				'emp_key_confirm' 	=> 'required|min:8|same:key'
			];
		}else{
			$rules = [
				'admin_name' 		=> 'required',
				'password' 			=> 'required',
				'name' 				=> 'required|min:2|unique:employee',
				'key' 			=> 'required|min:4|max:4|unique:employee',
				'emp_key_confirm' 	=> 'required|min:4|max:4|same:key'
			];
		}

        $validator = Validator::make($data,$rules);
        if($validator->fails()){
            return Redirect::back()
                ->withErrors($validator)
                ->withInput();
        }else{
        	$admin = User::where('name', $data['admin_name'])->first();
        	if(!$admin)
        		return Redirect::back()->with('global', 'Admin Does not exist');
        	if(!Hash::check($data['password'], $admin->password))
        		return Redirect::back()->with('global', 'Incorrect Password');

        	$emp = new User;
        	$emp->name =  $data['name'];
        	if($data['emp_role'] == 0)
	        	$emp->password = Hash::make($data['key']);
	        else
	        	$emp->key = Hash::make($data['key']);
        	$emp->emp_type = $data['emp_role'];
        	$emp->save();
            return Redirect::back()->with('global', 'New Employee Added!');
        }
	}

}
