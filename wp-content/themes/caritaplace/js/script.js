$(document).ready(initialiser);

function initialiser(){
	$("#accordion" ).accordion({heightStyle: "content"});
	$(".giveMonney").ionRangeSlider({
		postfix: " €",
		onChange: function(obj){        // function-callback, is called on every change
	        $('.paypal-button input[name=amount]').val(obj.fromNumber);
	    }
	});
}

