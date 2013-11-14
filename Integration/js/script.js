$(document).ready(initialiser);

function initialiser(){
	$( "#accordion" ).accordion({heightStyle: "content"});
	$("#giveMonney").ionRangeSlider({postfix: " €"});
}