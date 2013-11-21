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
        $( "#rond" ).on('click', function(evt){
            evt.preventDefault();
            //var taille = parseInt(document.forms["test"].elements["taille"].value);
            localisation.creerCercle(2500);
        });
        google.maps.event.addListener(markerUser, 'click', function (){
            evt.preventDefault();
            localisation.creerCercle(2500);
        });
        form.on("click", code, false);


        //-------------------EXPERIMENTATION-------------------------------
        // document.getElementById('rond').addEventListener('click', function(evt){
        //     evt.preventDefault();
        //     //var taille = parseInt(document.forms["test"].elements["taille"].value);
        //     localisation.bigTri.call(this);
        // });
        // google.maps.event.addListener(markerUser, 'click', function (){
        //     evt.preventDefault();
        //     localisation.bigTri.call(this);
        // });
        // form.addEventListener("click", localisation.bigTri, false);
        //-------------------FIN EXPERIMENTATION-------------------------------


    }
    ,
    nonlocalized : function(pos){
        console.warn('Impossible d\'effectuer la géolocalisation');
    }
});
var form = $('submit');

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




