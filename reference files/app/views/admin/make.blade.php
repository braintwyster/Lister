@extends('layouts.base')

@section('content')
<div class="container">
	<div class="row">
		<div class="col-md-4 col-md-offset-4">
			<div class="well">
				<h1>Make Employee</h1>

				@if($errors->all())
					<div class="errorsDiv">
						<div class="well errorsWell">
							@foreach($errors->all() as $message)
								{{ $message }} <br />						
							@endforeach
						</div>
					</div>
				@endif
				@if(Session::has('global'))
					<p>{{ Session::get('global') }}
				@endif

				{{Form::open(['url'=>'/make-employee'])}}
					<div class="row" id="adminKey">
						<div class="col-xs-6 no-pad">
							{{Form::text('admin_name', '', ['class'=>'login form-control', 'placeholder'=>'Admin Name'])}}
						</div>
						<div class="col-xs-6 no-pad">
							{{Form::password('password', ['class'=>'login form-control', 'placeholder'=>'Admin Password'])}}
						</div>
					</div>
					{{Form::select('emp_role',['1'=>'New Employee','2'=>'New Manager','0'=>'Super'],'1',['class'=>'form-control'])}}
					{{Form::text('name','',['class'=>'form-control','placeholder'=>'Employee Name'])}}
					{{Form::password('key', ['class'=>'login form-control', 'placeholder'=>'Employee Key'])}}
					{{Form::password('emp_key_confirm', ['class'=>'login form-control', 'placeholder'=>'Re-Key'])}}
					{{Form::submit('Make Emloyee', ['class'=>'pull-right btn btn-primary'])}}
				{{Form::close()}}
			</div>
		</div>
	</div>
</div> 
@stop