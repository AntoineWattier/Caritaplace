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
        google.maps.event.addListener(markerUser, 'click', function (evt){
            evt.preventDefault();
            localisation.creerCercle(2500);
        });


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


    },
    nonlocalized : function(pos){
        console.warn('Impossible d\'effectuer la géolocalisation');
    }
});


$('input[name="ok"]').on("click", function(evt) {
    evt.preventDefault();
    var nom = $('input[name="name"]').val().toUpperCase();
    for (var i = 0; i < tabPin.length; i++) {
        tabPin[i].setVisible(true);
        var nomJson = tabPin[i].get('nom').toUpperCase();
        if (nomJson.indexOf(nom)==-1) {
            tabPin[i].setVisible(false);
        }
    }
});

$('input[name="categories"]').on("click", function(evt){
    //Tableau des checkbox catégories cochées
    var checked = $('input[name="categories"]:checked');

    //Création du tableau des catégories
    var catChecked = new Array();
    checked.each(function(index,el){
        catChecked.push(el.value);
    })
  
    for (var i = 0; i < tabPin.length; i++) {
        tabPin[i].setVisible(true);

        var catPin = tabPin[i].get('categories');

        for (var j = 0; j < catChecked.length; j++) {
            if ($.inArray(catChecked[j],catPin)==-1) {
                tabPin[i].setVisible(false);
            }
        }           
    }
});

$('input[name="action"]').on("click", function(evt) {

    var action =$('input[name="action"]:checked').val().toUpperCase();
    for (var i = 0; i < tabPin.length; i++) {
        tabPin[i].setVisible(true);
        var actionJson = tabPin[i].get('action_en_cours').toUpperCase();
        console.log(actionJson);
        console.log(action);
        if (actionJson != action) {
            tabPin[i].setVisible(false);
        }
    }
});


