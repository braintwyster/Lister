<div class="navbar-wrapper">
    <div class="container">

        <nav class="navbar navbar-inverse navbar-static-top" role="navigation">
          	<div class="container">
            	<div class="navbar-header">
              		<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
		                <span class="sr-only">Toggle navigation</span>
		                <span class="icon-bar"></span>
		                <span class="icon-bar"></span>
		                <span class="icon-bar"></span>
		            </button>
              		
            	</div>   
            	<div id="navbar" class="navbar-collapse collapse">
                  <ul class="nav navbar-nav">
                    <li><a href="/">Home</a></li>
                    @if(Auth::check())
                        <li class="pull-right"><a href="/logout">logout</a></li>
                    @endif
                  </ul>
              </div>
    		    </div>       
		    </nav>
	  </div>
</div>

