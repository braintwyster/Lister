<?php

class AdminController extends \BaseController {

	public function employeeLogin()
	{
		return View::make('employee.login');
	}
	public function index()
	{
		$types = [
					'0'=>'---Choose Type---',
					'1'=>'Ale',
					'2'=>'Lager',
					'3'=>'Stout',
					'4'=>'Porter',
					'5'=>'Malt',
					'6'=>'Soft Drink',
					'7'=>'---Other---'
				];
		$styles = [
					'0'=>'---Choose Style---',
					'1'=>'Amber',
					'2'=>'Belgian',
					'3'=>'Blonde',
					'4'=>'Brown',
					'5'=>'Cream',
					'6'=>'Dark',
					'7'=>'Fruit',
					'8'=>'Golden',
					'9'=>'Honey',
					'10'=>'IPA',
					'11'=>'IRA',
					'12'=>'Light',
					'13'=>'Lime',
					'14'=>'Pale',
					'15'=>'Pilsner',
					'16'=>'Red',
					'17'=>'Strong',
					'18'=>'Wheat'
				];
		return View::make('admin.admin',[
				'types' 	=> $types,
				'styles' => $styles
		]);
	}
	public static function drinkImg($type, $style)
	{
		if($style == 1 || $style == 2 || $style == 3 || $style == 7 || $style == 8 || $style == 9 || $style == 15)
			return 'belgians.png';
		if($style == 6 || $style == 17)
			return 'stout.png';
		if($style == 12 || $style == 13 || $style == 18 || $style == 5)
			return 'lager.png';
		if($style == 10 || $style == 11 || $style == 16 || $style == 4 || $style == 14)
			return 'ipa.png';
		if($type == 1)
			return 'ipa.png';
		if($type == 2 || $type == 5)
			return 'lager.png';
		if($type == 3|| $type == 4)
			return 'stout.png';
		if($type == 6)
			return 'soda.png';
	}
	public static function editDrink($data)
	{
		$rules = [
			'name'=>'required|min:3',
			//'desc'=>'min:3',
			'type'=>'required',
			'style'=>'',
			'ibu'=>'',
			'abv'=>'',
			'price'=>'required',
			'quantity'=>'',
			'new'=>'',
			'favorite'=>''
		];

		$v = Validator::make($data,$rules);
        if($v->fails()){
            return Redirect::back()->withErrors($v)->withInput();
        }else{
        	$drink = Drink::find($data['id']);
        	$drink->fill($data);
        	$drink->save();
        	return Redirect::back();
        }
	}
	public function addDrink()
	{
		$data = Input::all();
		if($data['id'] != '')
			return $this::editDrink($data);
		$rules = [
			'name'=>'required|min:3',
			//'desc'=>'min:3',
			'type'=>'required',
			'style'=>'',
			'ibu'=>'',
			'abv'=>'',
			'price'=>'',
			'quantity'=>'',
			'new'=>'',
			'favorite'=>''
		];

		$v = Validator::make($data,$rules);
        if($v->fails()){
            return Redirect::back()->withErrors($v)->withInput();
        }else{
        	$drink = new Drink();
        	$drink->fill($data);
        	$drink->save();
        	return Redirect::back();
        }

	}
	public function deleteDrink($drinkID){
		$drink = Drink::find($drinkID);

		$drink->delete();
        return Redirect::back();

	}
	public static function displayDrinks($admin)
	{
		$ds = Drink::get()->all();
		$drinks = '';
		$i = 0;
		foreach ($ds as $d) {
			$i++;
			if($i = 1 || $i = 10)
				$drinks .= '<div class="col-xs-6">';

			if($admin == 98247)
				$edit = '<a href="#" onclick="edit('.$d->id.')" class="btn btn-primary no-pad">edit</a>
						<a href="/deleteDrink/'.$d->id.'" class="btn btn-danger no-pad">delete</a>
				';
			else
				$edit = '';
			if($d->new == 1)
				$new = '<img src="/assets/img/favorite.png" class="favoriteDrink">';
			else
				$new = '';
									// <div class="col-xs-2">
									// 	IBU
									// 	<div class="drinkIbu">
									// 		'.$d->ibu.'
									// 	</div>
									// </div>
			$drinks .= '<div class="row well drinkBtn">
							<div class="drinkEdit">
								'.$edit.'
							</div>
							<div class="col-xs-1 no-pad">
								<img src="/assets/img/'.AdminController::drinkImg($d->type, $d->style).'" class="img-responsive drinkImg">
							</div>
							<div class="col-xs-9 nameDesc">
								<div class="row">
									<div class="col-xs-12">
										<div class="drinkName">
											'.$d->name.'
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12">
										<div class="foodDesc">
											'.$d->desc.'
										</div>
									</div>
								</div>
							</div>
							<div class="col-xs-2 no-pad">
								<div class="drinkNew">
									'.$new.'
								</div>
								ABV
								<div class="drinkAbv">
									'.round($d->abv, 2).'%
								</div>
							</div>
						</div>
			';
			if($i = 9 || $i = 16)
				$drinks .= '</div>';
		}	
		return $drinks;
	}

	public function addFood()
	{
		$data = Input::all();
		if($data['id'] != '')
			return $this::editDrink($data);
		$rules = [
			'name'=>'required|min:3',
			//'desc'=>'min:3',
			'price'=>'required'
		];

		$v = Validator::make($data,$rules);
        if($v->fails()){
            return Redirect::back()->withErrors($v)->withInput();
        }else{
        	$food = new Food();
        	$food->fill($data);
        	$food->save();
        	return Redirect::back();
        }

	}
	public static function displayFood($admin)
	{
		$fs = Food::get()->all();
		$foods = '';
		foreach ($fs as $f) {
			if($admin == 98247)
				$edit = '<a href="#" onclick="edit('.$f->id.')" class="btn btn-primary no-pad">edit</a>
						<a href="#" onclick="delete('.$f->id.')" class="btn btn-danger no-pad">delete</a>
				';
			else
				$edit = '';
			if($f->new == 1)
				$new = '<img src="/assets/img/favorite.png" class="favoriteDrink">';
			else
				$new = '';
			$foods .= '<div class="row foodItem">
							<div class="drinkEdit">
								'.$edit.'
							</div>
							<div class="col-xs-10">
								<div class="row">
									<div class="col-xs-12">
										<div class="foodName">
											'.$f->name.'
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12">
										<div class="foodDesc">
											'.$f->desc.'
										</div>
									</div>
								</div>
							</div>
							<div class="col-xs-2">
								<div class="col-xs-3">
									Price
									<div class="foodPrice">
										$'.$f->price.'
									</div>
								</div>
							</div>
						</div>
			';
		}	
		return $foods;
	}
}
