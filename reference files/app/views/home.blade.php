@extends('layouts.base')

@section('head')
	<style type="text/css">
		.navbar{
			display: none;
		}

	</style>
@stop

@section('content')
<div class="container">
	<div class="row">
		<div class="col-xs-12">
			<div class="row">
				<div class="col-xs-1" style="margin-bottom:15px;">
					<div id="logo">
						<img src="/assets/img/logo.png" class="img-responsive">
					</div>
				</div>
				<div class="col-xs-8" id="tweets">
					
					<script>
						!function(d,s,id){
							var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
							if(!d.getElementById(id)){
								js=d.createElement(s);js.id=id;
								js.src=p+"://platform.twitter.com/widgets.js";
								fjs.parentNode.insertBefore(js,fjs);
							}
						}
						(document,"script","twitter-wjs");
					</script>
				</div>
			</div>
			<!-- <div class="row">
				<div id="foodContainer">
					{{AdminController::displayFood(0)}}
				</div>
			</div> -->
			<div id="drinks">
				<div class="row">
					<div class="col-xs-12">
						<div class="row">
							{{AdminController::displayDrinks(0)}}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-6">
			
		</div>
	</div>
</div>
<script type="text/javascript">
	$(document).ready(function(){
		$('.timeline-footer').hide();
	});
</script>
@stop