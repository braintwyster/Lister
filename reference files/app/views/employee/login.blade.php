@extends('layouts.base')

@section('head')

@stop

@section('content')

<div class="container">
	<div class="row">
		<div class="col-xs-6 col-xs-offset-3">
			<div class="well">
				{{Form::open(['/empLogin'])}}
					{{Form::text('')}}
				{{Form::close()}}
			</div>
		</div>
	</div>
</div>	


@stop