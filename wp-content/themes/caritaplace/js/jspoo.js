localisation.init({
    carte : 'the_map',
    localized : function (pos) {
        var crd = pos.coords;
        var myLatlng = new google.maps.LatLng(crd.latitude,crd.longitude);
        bounds.extend(myLatlng);
        var imageMarqueur = new google.maps.MarkerImage('wp-content/themes/caritaplace/images/pinUser1.png', new google.maps.Size(24, 34), new google.maps.Point(0,0), new google.maps.Point(12, 34));        
            markerUser = new google.maps.Marker({
            position: myLatlng,
            title: "Vous",
            icon: imageMarqueur
        });
        markerUser.setMap(map);

        //remplacer par activation du rayon de recherche
        document.getElementById('rond').addEventListener('click', function(evt){
            evt.preventDefault();
            //var taille = parseInt(document.forms["test"].elements["taille"].value);
            localisation.creerCercle.call(this,2500);
        });

    }
    ,
    nonlocalized : function(pos){
        console.warn('Impossible d\'effectuer la géolocalisation');
    }
});
var form = document.getElementsByName('submit')[0];

function code (evt) {
    evt.preventDefault();
    var nom = document.getElementsByName('name')[0].value.toUpperCase();

    for (var i = 0; i < tabPin.length; i++) {
        var nomJson = tabPin[i]._infowindow.content.toUpperCase();
        if (nomJson.indexOf(nom)==-1) {
            tabPin[i].setVisible(false);
        }
    }
    return false;
}

form.addEventListener("click", code, false);

