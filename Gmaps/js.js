$(document).ready(initialize);
// var tableauMarker = new Array();
// tableauMarker = ["9 avenue corentin cariou","5 avenue corentin cariou","3 avenue corentin cariou"];
var geocoder;
var map;
var i =0;
var coordonnees;
var bounds;

function initialize() {
	geocoder = new google.maps.Geocoder();
	bounds = new google.maps.LatLngBounds();

  	var mapOptions = {
	    zoom: 14,
	    center: new google.maps.LatLng(48.896707, 2.384244),
	    mapTypeId: google.maps.MapTypeId.ROADMAP
  	};

  	map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
  	ajouterMarkers();

  	$("#inputButtonGeocode").click(codeAddress);

  	for (var i = 0; i < tableauMarker.length; i++) {
  		geocoder.geocode( { 'address': tableauMarker[i]}, function(results, status) { 
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
				 map: map,
				 position: results[0].geometry.location
				});
			}
			else{
				alert("Geocode was not successful for the following reason: " + status);
			}
		});
  	};
}
function ajouterMarkers(){
	downloadUrl('adresses.json',function(data){
		var reponse = eval(data);
		var nombreAdresse = reponse.adresses.length;

		for (var i = 0; i < nombreAdresse; i++) {
				if(reponse.adresses[i].adresse)
				{
					geocodeAdress(reponse.adresses[i].adresse);
				}
		}
	});
}

function geocodeAdress(sAddress){
	geocoder.geocode( { 'address': sAddress}, function(results, status) { 
	if (status == google.maps.GeocoderStatus.OK) {
		coordonnees = results[0].geometry.location;
		bounds.extends(coordonnees);
		var marker = new google.maps.Marker({
		 	position: coordonnees
		});
		marker.setMap(map);
		map.fitBounds(bounds);
	}
	else{
		alert("Geocode was not successful for the following reason: " + status);
	}
});
}


