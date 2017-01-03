@extends('layouts.base')

@section('head')

@stop

@section('content')
<div class="container">
	<div class="row">
		<div role="tabpanel">

			<!-- Nav tabs -->
			<ul class="nav nav-tabs" role="tablist">
			    <li role="presentation" class="active"><a href="#drinks" aria-controls="home" role="tab" data-toggle="tab">Drinks</a></li>
			    <li role="presentation"><a href="#foods" aria-controls="profile" role="tab" data-toggle="tab">Foods</a></li>
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
			    <!----DRINKS---->
			    <div role="tabpanel" class="tab-pane active" id="drinks">
			    	<div class="col-md-12">
						<div class="row">
							<div class="col-xs-4" id="addDrink">
								<div class="well">
									<h2>Add Drink</h2>
									<div class="row" id="addDrinkForm">
										{{Form::open(['url'=>'/addDrink'])}}
											{{Form::hidden('id','')}}
											<div class="col-xs-6">
												<label>Name</label>
												{{Form::text('name','',['class'=>'form-control','placeholder'=>'Name'])}}
												<label>Description</label>
												{{Form::text('desc','',['class'=>'form-control','placeholder'=>'Description'])}}
												<label>Drink Type</label>
												{{Form::select('type',[$types],'',['class'=>'form-control'])}}
												<label>Drink Style</label>
												{{Form::select('style',[$styles],'',['class'=>'form-control'])}}
											</div>
											<div class="col-xs-6">
												<div class="row">
													<div class="col-xs-6">
														<label>IBU</label>
														{{Form::text('ibu','',['class'=>'form-control','placeholder'=>'IBU'])}}
													</div>
													<div class="col-xs-6">
														<label>ABV</label>
														{{Form::text('abv','',['class'=>'form-control','placeholder'=>'ABV'])}}
													</div>
												</div>
												<div class="row">
													<div class="col-xs-6">
														<label>Price</label>
														{{Form::text('price','',['class'=>'form-control','placeholder'=>'Price'])}}
													</div>
													<div class="col-xs-6">
														<label>Quantity</label>
														{{Form::text('quantity','',['class'=>'form-control','placeholder'=>'Quantity'])}}
													</div>
												</div>
												<label>New</label>
												{{Form::select('new',['0'=>'Standerd','1'=>'New'],'0',['class'=>'form-control','placeholder'=>'New'])}}
												<label>Favorite</label>
												{{Form::select('favorite',['0'=>'Standard','1'=>'Favorite'],'0',['class'=>'form-control','placeholder'=>'Favorite'])}}
											</div>
											{{Form::submit('Add Drink', ['class'=>'btn btn-primary pull-right'])}}
										{{Form::close()}}
									</div>
								</div><!--Well-->
							</div><!--COL-->
							<div class="col-xs-8">
								<div class="well">
									<div class="row">
										<div class="col-xs-12">
											{{AdminController::displayDrinks(98247)}}
										</div>
									</div>
								</div>
							</div>
						</div><!--ROW-->
					</div>
			    </div>
			    <!----/DRINKS---->

			    <!----FOOD---->
			    <div role="tabpanel" class="tab-pane" id="foods">
			    	<div class="col-md-12">
						<div class="row">
							<div class="col-xs-6" id="addDrink">
								<div class="well">
									<h2>Add Food</h2>
									<div class="row" id="addDrinkForm">
										{{Form::open(['url'=>'/addFood'])}}
											{{Form::hidden('id','')}}
											<div class="col-xs-6">
												<label>Name</label>
												{{Form::text('name','',['class'=>'form-control','placeholder'=>'Name'])}}
												<label>Description</label>
												{{Form::text('desc','',['class'=>'form-control','placeholder'=>'Description'])}}
												<label>Price</label>
												{{Form::text('price','',['class'=>'form-control','placeholder'=>'Price'])}}
											</div>											
											{{Form::submit('Add Food', ['class'=>'btn btn-primary pull-right'])}}
										{{Form::close()}}
									</div>
								</div><!--Well-->
							</div><!--COL-->
							<div class="col-xs-6">
								<div class="well">
									<div class="row">
										<div class="col-xs-12">
											{{AdminController::displayFood(98247)}}
										</div>
									</div>
								</div>
							</div>
						</div><!--ROW-->
					</div>
			    </div>
			    <!----/FOOD---->

			</div>	

		</div>
		
	</div>
</div> 

@stop