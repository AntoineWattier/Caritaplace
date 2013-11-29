<footer>
	<p>@ 2013 Groupe 10 - All right reserved</p>
</footer>
</div>
	  <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
      <script type="text/javascript" src="<?php echo get_stylesheet_directory_uri(); ?>/js/localisation.js"></script>
      <script type="text/javascript" src="<?php echo get_stylesheet_directory_uri(); ?>/js/utils.js"></script>
	  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  	  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
  	  <script src="<?php echo get_stylesheet_directory_uri(); ?>/rangeSlider/js/ion-rangeSlider/ionrangeSlider.js"></script>
	  <script src="<?php echo get_stylesheet_directory_uri(); ?>/js/bootstrap.js"></script>
	  <script src="<?php echo get_stylesheet_directory_uri(); ?>/js/script.js"></script>
	  <script src="<?php echo get_stylesheet_directory_uri(); ?>/js/modernizr.custom.js"></script>
	  <script type="text/javascript" src="<?php echo get_stylesheet_directory_uri(); ?>/js/videoProjet.js"></script>
	  <script type="text/javascript">
		// création d'un player
		  var p=new player({
			autre:'#video',
			controller:'#progressBar',
			progress:'#progressBar :nth-child(1)',
			buffer:'#progressBar :nth-child(2)',
			volume:'#mute',
			volumeBar:'#volumeProgress span',
			//fonction appelée en call back lorsque la vidéo est chargée, elle ajoute l'évènement pour appeler la fonction playpause()
			loaded:function(player){ 
			  console.log('loaded');
			  var button = document.getElementById('button');
			  button.addEventListener('click',p.playpause,false);
			},
			//fonction appelée en call back lorsque la vidéo est lancée, elle modifie le style de certains éléments de la page
			played:function(){
			  document.getElementById('video').classList.add('play');
			  var button = document.getElementById('button');
			  button.querySelector('span.pla').style.display="none";
			  var span = button.querySelector('span.paus');
			  var span2 = span.nextSibling.nextSibling;
			  span.style.display="inline-block";
			  span.style.marginRight="0.1em";
			  span2.style.display="inline-block";
			  span2.style.marginLeft="0.1em";
			  console.log('playing'); 
			},
			//fonction appelée en call back lorsque la vidéo est mise en pause, elle modifie le style de certains éléments de la page
			paused:function(){
			  var button = document.getElementById('button');
			  button.querySelector('span.pla').style.display="block";
			  var span = button.querySelector('span.paus');
			  var span2 = span.nextSibling.nextSibling;
			  span.style.display="none";
			  span2.style.display="none";
			  console.log('paused'); 
			},
			//fonction appelée en call back lorsque le currentTime est changé
			moved:function(){
			  console.log('video moved'); 
			},
			//fonction appelée en call back lorsque le son est remit en marche, elle change le style du bouton volume
			mutedSon:function(){
				console.log('son en route');
				var volumeButton = document.getElementById('mute');
				volumeButton.style.backgroundImage='url("<?php echo get_stylesheet_directory_uri(); ?>/assets/volume.png")';
			},
			//fonction appelée en call back lorsque le son est coupé, elle change le style du bouton volume
			mutedSonNo:function(){
				console.log('son coupé');
				var volumeButton = document.getElementById('mute');
				volumeButton.style.backgroundImage='url("<?php echo get_stylesheet_directory_uri(); ?>/assets/volumeOff.png")';
			},
			//fonction appelée en call back lorsque le volume est changé
			volumeRegle:function(){
				console.log('son réglé');
			}
		  });
			
			// ajout des évènements sur les éléments de la page
		  document.getElementById('button').addEventListener('click',p.playpause,false);
		  document.getElementById('progressBar').addEventListener('click',p.setVideoTime,false);
		  document.getElementById('mute').addEventListener('click',p.muterVolume,false);
		  document.getElementById('video').addEventListener('click',p.playpause, false);
		  document.getElementById('volumeProgress').addEventListener('click', p.reglerVolume, false);
		</script>
</body>
<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri(); ?>/js/jspoo.js"></script>
</html>