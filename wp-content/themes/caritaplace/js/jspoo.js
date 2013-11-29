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
var action = false ;
var nom = false ;





$('input[name="ok"]').on("click", function(){
    console.log("fonction lancée");
    if (!nom) {
        $(".filterlist").append("<div><p>nom : <strong>'"+$('input[name="name"]').val()+"'</strong></p><a id='nomFilter' href='#''>X</a></div>");
        nom = true;
        $('#nomFilter').on("click", function(){
            console.log("evenement assigné");
            event.preventDefault();
            nom = false;
                        console.log("evenement assigné2");

            $('input[name="name"]').val("");
                        console.log("evenement assigné3");

            $(this).parent().remove();
                        console.log("evenement assigné4");

            localisation.tri();
            return false;
        });
    }
    localisation.tri();
});

$('input[name="action"]').on("click", function() {
    localisation.tri();
    if (!action) {
        $(".filterlist").append("<div><p>action en cours : <strong>"+$(this).val()+"</strong></p><a id='actionFilter' href='#''>X</a></div>");
        action = true;
        $('#actionFilter').on("click", function(){
            event.preventDefault();
            action = false;
            $('input[name="action"]').attr('checked', false);
            $('#actionFilter').parent().remove();
            localisation.tri();
            return false;
        });
    }
});

$('input[name="reset"]').on("click", function() {
    localisation.reset_tri();
    $(".filterlist").children().remove();
});


