localisation.init({
    carte : 'the_map',
    localized : function (pos) {
        var crd = pos.coords;
        var myLatlng = new google.maps.LatLng(crd.latitude,crd.longitude);
        bounds.extend(myLatlng);
        var imageMarqueur = new google.maps.MarkerImage('images/pinUser1.png', new google.maps.Size(50, 50), new google.maps.Point(0,0), new google.maps.Point(25, 50));        
            markerUser = new google.maps.Marker({
            position: myLatlng,
            title: "Vous",
            icon: imageMarqueur
        });
        markerUser.setMap(map);

        // remplacer par activation du rayon de recherche
        document.getElementById('rond').on('click', function(){
            var taille = parseInt(document.forms["test"].elements["taille"].value);
            localisation.tri.call(this,taille);
        });

    }
    ,
    nonlocalized : function(pos){
        console.warn('Impossible d\'effectuer la géolocalisation');
    }
});