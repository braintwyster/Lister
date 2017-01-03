@extends('layouts.base')

@section('head')

@stop
@section('content')
<div class="container">
	<div class="row">
		<div class="col-md-4 col-md-offset-4">
			<div class="well">
				<h1>Admin Login</h1>

				@if($errors->all())
					<div class="errorsDiv">
						<div class="well errorsWell">
							@foreach($errors->all() as $message)
								{{ $message }}	<br />					
							@endforeach
						</div>
					</div>
				@endif
				{{Form::open(['url'=>'/login'])}}
					{{Form::text('name', '', ['class'=>'login form-control', 'placeholder'=>'Admin Name'])}}
					{{Form::password('password', ['class'=>'login form-control', 'placeholder'=>'Password'])}}
					{{Form::submit('Login', ['class'=>'pull-right btn btn-primary'])}}
				{{Form::close()}}
			</div>
		</div>
	</div>
</div> 
@stop