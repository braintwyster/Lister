module.exports = function () { 
	function Despensary (slug, state, city){
		$.getJSON("https://www.cannabisreports.com/api/v1.0/dispensaries/"+state+""+city+""+slug, 
		function() { 
    		console.log(data);
		});
	}

}