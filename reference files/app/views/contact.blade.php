@extends('layouts.base')


@section('head')
	<style type="text/css">
		body{
			background-image: url(/assets/images/black-bg.png);
		}
		.navbar{
	      background-image: url(assets/images/{{$headerImg}});
	      height: 250px;
	    }
		.info{
			display: none;
		}
		label{
			float: left;
		}
		@media (max-width: 991px){
	      .navbar{
	        height:255px;
	      }
	    }
	    @media (max-width: 767px){
	      .navbar{
	        height:200px;
	      }
	    }
	    @media (max-width: 400px){
	      .navbar{
	        height:100px;
	      }
	    }
	</style>
@stop

@section('content')

	<div class="container">
		<div class="row">
			<h3>Contact</h3>
			<div class="col-md-4 col-md-offset-4">
				<div class="well">
					{{Form::open()}}
						<label>What's Your Email?</label>
						{{Form::text('email', '',['class'=>'form-control'])}}
						<label>Phone Number (optional)</label>
						{{Form::text('phone', '',['class'=>'form-control'])}}
						<label>What's Up?</label>
						{{Form::textarea('body', '',['class'=>'form-control'])}}
						{{Form::submit('Send',['class'=>'btn btn-primary pull-right'])}}
					{{Form::close()}}
				</div>
			</div>
		</div>
	</div>
@stop