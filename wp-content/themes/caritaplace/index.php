
<?php get_header(); ?>
<body>
	<div class="superglobale">
		<section id="map">
			<div id="the_map">
				<div class="loader">
				     <div></div>
				     <div></div>
				     <div></div>
				     <div></div>
				     <div></div>
				     <div></div>
				     <div></div>
				     <div></div>
				</div>
			</div>
			<div id="filtre">
				<h2>PRECISEZ VOTRE RECHERCHE</h2>
				<div>
					<button class="btnType btn btn-5 btn-5a" id="rond"><span>Où suis-je ?</span></button>
					<!-- CREATION DU LOADER -->
					<div class="miniLoader">
						 <div></div>
						 <div></div>
					     <div></div>
					     <div></div>
					     <div></div>
					     <div></div>
					     <div></div>
					     <div></div>
					</div>
				</div>		
				<div id="accordion">
					  <h3>Nom</h3>
					  <div>
				  		<input type="text" name="name" >
						<input type="button" name="ok" value="OK">
					  </div>
					  <h3>Catégories</h3>
					  <div class="clearfix">
						  	<?php  
					        $categories = get_terms( 'categories', array(
					          'orderby'    => 'name',
					          'hide_empty' => 0
					        ));
						        foreach ($categories as $categorie) : ?>     
					              <input type="checkbox" name="categories" value="<?php echo $categorie->slug ?>" id="<?php echo $categorie->slug ?>" />
					              <label for="<?php echo $categorie->slug ?>" class="wrap" ><?php echo $categorie->name ?>	</label>			     
					        <?php endforeach; ?>
					  </div>
					  <h3>Action en cours</h3>
					  <div class="clearfix">
						<?php  
					        $actions = get_terms( 'action_en_cours', array(
					          'hide_empty' => 0
					        ));
						        foreach ($actions as $action) : ?>     
					              <input type="radio" name="action" value="<?php echo $action->slug ?>" id="<?php echo $action->slug ?>" />
					              <label for="<?php echo $action->slug ?>" class="wrap" ><?php echo $action->name ?>	</label>			     
					        <?php endforeach; ?>
					</div>
				</div>
				<input class="btnType" type="button" name="reset" VALUE="Réinitialiser les filtres">
			</div>
		</section>
		<section id="liste">
			<div class="content clearfix">
				<div id="default">
					<div>
						<h1 class="titreN1">Avec Caritaplace, aidez les associations autour de vous !</h1>
						<div id="conteneurVideo">
							<video id="video">
								<source src="<?php echo get_stylesheet_directory_uri(); ?>/assets/TheMotionCaritaplace.mp4"  type='video/mp4' >
								<source src="<?php echo get_stylesheet_directory_uri(); ?>/assets/TheMotionCaritaplace.iphone.mp4" type='video/mp4'>
								<source src="<?php echo get_stylesheet_directory_uri(); ?>/assets/TheMotionCaritaplace.ogv" type='video/ogg' >
								<p>Your user agent does not support the HTML5 Video element.</p>
							</video>
							<div id="toolbar">
								<div id="button" class="loading">
								  <span name="paus" class="paus"></span>
								  <span name="paus" class="paus"></span>
								  <span class="pla"></span>
								</div>
								<div id="progressBar">
								  <span class="progress"></span>
								  <span class="buffer"></span>
								</div>
								<div id="mute" >
									
								</div>
								<div id="volumeProgress">
								  <span class="progressVol"></span>
								</div>
							</div>
						 </div>
					</div>
				</div>
				<div id="alternative">
					<div>
						<h2 class="titreN1"><span id="number">6</span> associations correspondent à votre recherche</h2>
						<div class="filterlist clearfix">		
						</div>
						<div id="founded_assos" class="clearfix"></div>
					</div>
				</div>
			</div>
		</section>
		
		<?php get_footer() ?>