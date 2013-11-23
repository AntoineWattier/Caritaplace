var tabPin = new Array();
var lastClicked;
var longueurJson;
var markerUser;
var rond = false;
var circle;
var boundcircle;
var imgMarqueur = new google.maps.MarkerImage('wp-content/themes/caritaplace/images/pinAsso.png', new google.maps.Size(24, 34), new google.maps.Point(0,0), new google.maps.Point(12, 34));        

var localisation={
    
    defaults : {
            carte : '#carte',
            localized : function(){},
            nonlocalized : function(){},
    },
    

    init : function(options){
        this.params=$.extend(this.defaults,options);
        geocoder = new google.maps.Geocoder();
        bounds = new google.maps.LatLngBounds();

        var mapOptions = {
            zoom: 14,
            center: new google.maps.LatLng(48.896707, 2.384244),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles:
            [
              {
                "featureType": "poi",
                "stylers": [
                  { "saturation": -100 },
                  { "visibility": "off" }
                ]
              },{
                "featureType": "transit.station.rail",
                "stylers": [
                  { "saturation": 100 },
                  { "hue": "#0019ff" },
                  { "lightness": -4 },
                  { "gamma": 1.04 }
                ]
              },{
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                  { "visibility": "simplified" },
                  { "weight": 2.1 }
                ]
              },{
                "featureType": "water",
                "stylers": [
                  { "hue": "#1100ff" },
                  { "color": "#0c9bff" },
                  { "saturation": -62 }
                ]
              },{
                "featureType": "road.local",
                "stylers": [
                  { "lightness": 74 }
                ]
              },{
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                  { "color": "#A8A8A8" },
                  { "visibility": "on" }
                ]
              },{
                "featureType": "transit.line",
                "stylers": [
                  { "visibility": "off" }
                ]
              }
            ]
        };
        map = new google.maps.Map(document.getElementById(this.params.carte),mapOptions);
        this.ajouterMarkers();
    },

    creerCercle : function (taille) {
        if (rond) {
            circle.setMap(null);
            for (var i = 0; i < tabPin.length; i++) {
                tabPin[i].setVisible(true);
            } 
            rond = false;
        }else{
            for (var i = 0; i < tabPin.length; i++) {
                tabPin[i].setVisible(true);
            } 
            var rayon = taille;
            circle = new google.maps.Circle({
                map: map,
                clickable: false,
                // metre
                radius: rayon,
                fillColor: '#fff',
                fillOpacity: .6,
                strokeColor: '#313131',
                strokeOpacity: .4,
                strokeWeight: .8,
                editable:true
            });
            rond = true;
            // attach circle to marker
            circle.bindTo('center', markerUser, 'position');
            google.maps.event.addListener(circle, 'radius_changed', function(){ localisation.tri.call(this);} );
            google.maps.event.addListener(circle, 'center_changed', function(){ localisation.tri.call(this);} );
            localisation.tri.call(this);
            rond = true;
        }
    },
    bigTri : function() {
        alert("yo");
    },

    tri : function(){
        for (var i = 0; i < tabPin.length; i++) {
            tabPin[i].setVisible(true);
        } 
        for (var i = 0; i < tabPin.length; i++) {
            if (circle.getBounds().contains(tabPin[i].getPosition())==false) {
                tabPin[i].setVisible(false);
            }
        }
    },

    ajouterMarkers : function(){        

        downloadUrl('wp-content/themes/caritaplace/associations.json',function(data){
            var fichierJson = eval('('+data+')');
            longueurJson = fichierJson.length;
            for (var i = 0; i < longueurJson; i++) 
            {
                if(fichierJson[i].adresse_de_lassociation)
                {
                    var content = fichierJson[i];
                    localisation.geocodeAddress(fichierJson[i].adresse_de_lassociation,i,content);
                }
            }
        });
        this.geolocUser.call(this);
    },

    geolocUser : function(){
        var options = {
          enableHighAccuracy: true,
          maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(localisation.params.localized,
         localisation.params.nonlocalized,
         options);
    },


    geocodeAddress: function(sAddress,y,data){
        geocoder.geocode( { 'address': sAddress}, function(results, status) { 
            if (status == google.maps.GeocoderStatus.OK) {
                var coordonnees = results[0].geometry.location;
                bounds.extend(coordonnees);
                tabPin[y] = new google.maps.Marker({
                    position: coordonnees,
                    icon: imgMarqueur
                });

                var content = '<a href="'+data.permalink+'">'+data.nom+"</a>"+"<br>";
                var infoBulle = new google.maps.InfoWindow({
                  content: content
                })
                // Stockage infowindow pour open sur click
                tabPin[y]._infowindow = infoBulle;
                // ajout l'action sur onclick
                google.maps.event.addListener(tabPin[y], 'click', function (){
                    if (lastClicked!=undefined){
                        lastClicked._infowindow.close( map, this);
                    }
                    this._infowindow.open( map, this);
                    lastClicked = this;
                });
                tabPin[y].setMap(map);
                map.fitBounds(bounds);
                y++;
            }
            else{
                alert("La géolocalisation à échoué pour la raison suivante: " + status);
            }
        });
    }

};