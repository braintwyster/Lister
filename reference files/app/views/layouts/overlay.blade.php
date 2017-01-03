@if($errors->all())
	<div class="errorsDiv">
		<div class="well errorsWell">
			<div class="closeErrors btn btn-danger btn-xs pull-right">X</div>
			<h4>Errors:</h4>
			<ul class="errors bg-danger">
				@foreach($errors->all() as $message)
					<li>{{ $message }}</li>						
				@endforeach
			</ul>
		</div>
	</div>
@endif