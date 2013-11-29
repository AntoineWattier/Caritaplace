// initialisation de la map
localisation.init({
    carte : 'the_map',
    //callback en cas de reussite de la géoloc
    localized : function (pos) {
        localisation.reset_tri();
        $("#liste .content").css("left","0");
        $("#alternative").css("display","none");
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
    //callback en cas d'échec de la géoloc
    nonlocalized : function(pos){
        console.warn('Impossible d\'effectuer la géolocalisation');
    },
    //callback quand le tri est effectué
    sorted : function(){

        // on clear les anciennes asso;
        $('#founded_assos').html("");
        var compteur = 0;
        for (var i = 0; i < tabPin.length; i++) {
            if(tabPin[i].visible){

                //On créé nos blocs
                var div_main = $('<div>').addClass('element second col-md-6 col-sm-12 col-xs-12');
                var div_logo = $('<div>').addClass('logo');
                var link = $('<a>').addClass('btnType').attr('href', tabPin[i].permalink).text('Voir la page');
                var contour_logo  = $('<img>').addClass('fond').attr('src','http://antoine-wattier.fr/wordpress_hetic/wp-content/themes/caritaplace/css/images/fond_photo.png').attr('alt','nothing');
                var logo  = $('<img>').addClass('photo').attr('src',tabPin[i].logo).attr('alt','logo de l\'association');
                var span = $('<span>');
                var div_info = $('<div>').addClass('infos');
                var nom_asso = $('<h3>').text(unescape(tabPin[i].nom));
                var slogan = $('<p>').addClass('slog').text(tabPin[i].slogan);

                var cats = "";
                for (var j = 0; j < tabPin[i].categories.length; j++) {
                    cats = tabPin[i].categories[j]+" ";
                }

                var categories = $('<p>').addClass('categ').text('Catégories : '+cats);

                //On les associe
                div_info.append(nom_asso).append(slogan).append(categories);
                div_logo.append(link).append(contour_logo).append(logo).append(span);
                div_main.append(div_logo).append(div_info);

                $('#founded_assos').append(div_main);

                compteur++;
           }
        }
        $("#alternative").css("display","block");
        $("#liste .content").css("left","-100%");
        $("#number").text(compteur);
    }
});

//initialisation variable pour le tric
var boolAction = false ;
var boolNom = false ;
var boolCategorie = false;

//ecouteur le bouton ok du bloc de tri
$('input[name="ok"]').on("click", function(){
    if (!boolNom) {
        console.log('test');
        $(".filterlist").append("<div><p>nom : <strong>'"+$('input[name="name"]').val()+"'</strong></p><a id='nomFilter' href='#''>X</a></div>");
        nom = true;
        $('body').on("click", "#nomFilter", function(event){
            event.preventDefault();
            boolNom = false;
            $('input[name="name"]').val("");
            $(this).parent().remove();
            localisation.tri();
            return false;
        });
    }
    localisation.tri();
});

//ecouteur sur le tric par "action en cours"
$('input[name="action"]').on("click", function() {
    localisation.tri();
    if (!boolAction) {
        $(".filterlist").append("<div><p>action en cours : <strong>"+$(this).val()+"</strong></p><a id='actionFilter' href='#''>X</a></div>");
        boolAction = true;
        $('#actionFilter').on("click", function(){
            event.preventDefault();
            boolAction = false;
            $('input[name="action"]').attr('checked', false);
            $('#actionFilter').parent().remove();
            localisation.tri();
            return false;
        });
    }
});

//Gestion des catégories
$('input[name="categories"]').on("click", function(){
    localisation.tri();
    if($(this).is(':checked')){ 
        $(".filterlist").append("<div><p>categorie : <strong>"+$(this).val()+"</strong></p><a class='catFilter' data-cat='"+$(this).val()+"' href='#''>X</a></div>");

        $('body').on("click",".catFilter", function(event){
                event.preventDefault();
                boolCategorie = false;
                $('input[value="'+$(this)[0].getAttribute('data-cat')+'"]').attr('checked', false);
                $(this).parent().remove();
                localisation.tri();
                return false;
        });
    } else {
        var checked = $(this).find(':checked').context.value;
        for (var i = 0; i < $('.catFilter').length; i++) {
            if($($('.catFilter')[i]).data('cat') == checked){
                $($('.catFilter')[i]).parent().remove();
            }
        };
          
    }
});

//ecouteur sur le bouton reset du bloc de tri
$('input[name="reset"]').on("click", function() {
    localisation.reset_tri();
    $(".filterlist").children().remove();
    boolAction = false;
    boolNom = false;
    boolCategorie = false;
});


