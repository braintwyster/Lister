<!doctype html>
<html lang="en">
<head>
	@include('includes.head')	   	

    @yield('head')

</head>
<body>
	@include('includes.nav')
	@yield('content')

	@include('includes.footer') 
</body>
</html>