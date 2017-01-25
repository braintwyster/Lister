$(function(){
	var socket 		= io.connect()
		$subs 		= $('._subs')
		$subSelector=$('#_subscription_selector')
		$subSelect 	= '' 
		$stripeBox 	= $('#_stripe_container')
		$purchase 	= $('#_stripe_purchase_btn')
	
	$subs.click(function(l){
		$subSelect = l.currentTarget.dataset.value
		if($subSelect != ''){
			$subSelector.fadeOut().delay(500, function(){
				$stripeBox.fadeIn()
				$stripeBox.css({display:'flex'})
			})
		}
	})
	
})