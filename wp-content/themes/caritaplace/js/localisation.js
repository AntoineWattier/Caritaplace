var tabPin = new Array();
var lastClicked;
var longueurJson;
var markerUser;
var rond = false;
var circle;
var boundcircle;
var imgMarqueur = new google.maps.MarkerImage('http://antoine-wattier.fr/wordpress_hetic/wp-content/themes/caritaplace/images/pinAsso.png', new google.maps.Size(24, 34), new google.maps.Point(0,0), new google.maps.Point(12, 34));        

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

    recentrerUtilisateur : function (taille) {
        
        google.maps.event.addListenerOnce(map, 'idle', function(){
            $( "#rond" ).removeClass("loading");
        });
        if(
            !((Math.round(markerUser.getPosition().lng()*10000000000000)/10000000000000) == (Math.round(map.getCenter().lng()*10000000000000)/10000000000000)
            &&
            (Math.round(markerUser.getPosition().lat()*10000000000000)/10000000000000) == (Math.round(map.getCenter().lat()*10000000000000)/10000000000000)
            )){
            $( "#rond" ).addClass("loading");
            map.panTo(markerUser.getPosition());
        }       
        
    },

    // tri : function(){
    //     for (var i = 0; i < tabPin.length; i++) {
    //         tabPin[i].setVisible(true);
    //     } 
    //     for (var i = 0; i < tabPin.length; i++) {
    //         if (circle.getBounds().contains(tabPin[i].getPosition())==false) {
    //             tabPin[i].setVisible(false);
    //         }
    //     }
    // },

    tri : function(){

        for (var i = 0; i < tabPin.length; i++) {
                tabPin[i].setVisible(true);
        }


        var nom = $('input[name="name"]').val().toUpperCase();
        if(nom){
            for (var i = 0; i < tabPin.length; i++) {
                var nomJson = tabPin[i].get('nom').toUpperCase();
                if (nomJson.indexOf(nom)==-1) {
                    tabPin[i].setVisible(false);
                }
            }
        }
        //Tableau des checkbox catégories cochées
        var checked = $('input[name="categories"]:checked');
        if(checked){
            //Création du tableau des catégories
            var catChecked = new Array();
            checked.each(function(index,el){
                catChecked.push(el.value);
            })
          
            for (var i = 0; i < tabPin.length; i++) {
                var catPin = tabPin[i].get('categories');

                for (var j = 0; j < catChecked.length; j++) {
                    if ($.inArray(catChecked[j],catPin)==-1) {
                        tabPin[i].setVisible(false);
                    }
                }           
            }
        }
        var action = $('input[name="action"]:checked').val().toUpperCase();
        if(action){
            for (var i = 0; i < tabPin.length; i++) {
                var actionJson = tabPin[i].get('action_en_cours').toUpperCase();
                if (actionJson != action) {
                    tabPin[i].setVisible(false);
                }
            }
        }
    },

    reset_tri : function(){
        $('input[name="name"]').val("");

        var checked = $('input[name="categories"]:checked');
        if(checked){
            //Création du tableau des catégories
            checked.each(function(index,el){
                el.checked = false;
            })
        }

        var checked = $('input[name="action"]:checked');
        $('input[name="action"]:checked').removeAttr('checked');


    },

    ajouterMarkers : function(){        

        downloadUrl('http://antoine-wattier.fr/wordpress_hetic/wp-content/themes/caritaplace/associations.json',function(data){
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
            if ( $('.adresse').attr('data-lng')!= undefined && $('.adresse').attr('data-lat')!=undefined ) {
                var lat = $('.adresse')[0].getAttribute('data-lat');
                var lng = $('.adresse')[0].getAttribute('data-lng');
                var singleCoord = new google.maps.LatLng(lat,lng);
                map.setCenter(singleCoord);
                map.setZoom(16);
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

                var content = '<a href="'+data.permalink+'">'+data.nom+"</a>";
                if(data.categories)
                    for (var x = 0; x < data.categories.length; x++) {
                        content += '<p>'+data.categories[x].slug+'</p>';
                    }
                

                var infoBulle = new google.maps.InfoWindow({
                  content: content
                })


                //On stocke les infos pour quelles soient manipulables.
                tabPin[y].set('nom',data.nom);
                tabPin[y].set('action_en_cours',data.action_en_cours[0].slug);


                var cats = new Array();
                for (var i = 0; i < data.categories.length; i++) {
                    cats.push(data.categories[i].slug);
                }
                tabPin[y].set('categories',cats);
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