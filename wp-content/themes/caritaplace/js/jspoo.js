localisation.init({
    carte : 'the_map',
    localized : function (pos) {
        var crd = pos.coords;
        var myLatlng = new google.maps.LatLng(crd.latitude,crd.longitude);
        bounds.extend(myLatlng);
        var imageMarqueur = new google.maps.MarkerImage('http://antoine-wattier.fr/wordpress_hetic/wp-content/themes/caritaplace/images/pinUser1.png', new google.maps.Size(24, 34), new google.maps.Point(0,0), new google.maps.Point(12, 34));        
            markerUser = new google.maps.Marker({
            position: myLatlng,
            title: "Vous",
            icon: imageMarqueur
        });
        markerUser.setMap(map);

        //remplacer par activation du rayon de recherche
        $( "#rond" ).on('click', function(evt){
            evt.preventDefault();
            localisation.recentrerUtilisateur();
        });
        google.maps.event.addListener(markerUser, 'click', function (evt){
            evt.preventDefault();
            localisation.creerCercle(2500);
        });

    },
    nonlocalized : function(pos){
        console.warn('Impossible d\'effectuer la géolocalisation');
    }
});

//

$('input[name="ok"]').on("click", function(){
    localisation.tri();
});

$('input[name="categories"]').on("click", function(){
    localisation.tri();
});

$('input[name="action"]').on("click", function() {
    localisation.tri();
});

$('input[name="reset"]').on("click", function() {
    localisation.reset_tri();
    localisation.tri();
});


