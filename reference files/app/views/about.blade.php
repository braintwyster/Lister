@extends('layouts.base')


@section('head')
	<style type="text/css">
		body{
			background-image: url(/assets/images/black-bg.png);
			text-align: left;
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
		footer{
			text-align: center;
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
			<h3 style="text-align:center;">About</h3>
			<div class="col-md-3">
				<div class="well">
					<img src="{{$aboutImg->image}}" class="img-responsive">
				</div>
				
				<div class="bordered" style="padding-left:25px;">
					<h4>Phone</h4>
					<p>(503) 893-2571</p>
					<h4>Email</h4>
					<p>makemehoodrich@gmail.com</p>
				</div>
			</div>
			<div class="col-md-9 bordered">
				<div class="row">
					<div class="col-md-6">
						<div style="padding-left:25px;" class="bordered">
							<h4>Address:</h4>
							<p>109 SE Salmon St Suite #202</p> 
							<p>Portland, Oregon 97214</p>
						</div>						
						<h4>Hours:</h4>
						<p>No hours available</p>
						
						<h4>Short Description</h4>
						<p>Hood Rich is a Hood Rich is a body art salon. We offer tattoos, haircuts and color, waxing and skin care treatments.</p>
						
						<h4>Long Description</h4>
						<p>Hood Rich Body Art Salon strives to achieve an exclusive, VIP feel- a well-known secret amongst those who know. We’re not the neighborhood salon; we’re the artists’ community hidden within.</p> 

						<p>If you would like to help but are too far away to buy our services, please check out our crowd funding site :)</p>
						<p><a href="http://www.gofundme.com/7o8juo" style="font-size:1.3em;" class="btn btn-success" target="_blank">GoFundMe Project</a></p>

						<h4>Price Range</h4>
						<p>$$</p>
					</div>
					<div class="col-md-6">
						<iframe width="100%" height="400" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=109%20SE%20Salmon%20St%20Suite%20%23202%2C%20Portland%2C%20Oregon%2097214&key=AIzaSyBh7QOcGYesywh5oV1q-o0vX2h2-GpzkP0"></iframe>
					</div>
				</div>

				
			</div>
		</div>
	</div>
@stop