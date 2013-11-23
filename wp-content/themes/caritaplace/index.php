<?php get_header(); ?>
<body>
<section id="map">
	
	<div id="the_map">
	</div>
	<div id="filtre">
		<h2>PRECISEZ VOTRE RECHERCHE</h2>
		<a href="#" id="rond">LES ASSOCIATIONS AUTOUR DE MOI</a>
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
				              <input type="checkbox" name="mode_paiement" value="<?php echo $categorie->term_id ?>" id="<?php echo $categorie->slug ?>" />
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
				              <input type="radio" name="action" value="<?php echo $action->term_id ?>" id="<?php echo $action->slug ?>" />
				              <label for="<?php echo $action->slug ?>" class="wrap" ><?php echo $action->name ?>	</label>			     
				        <?php endforeach; ?>
				</div>
			</div>
		<input type="button" name="reset" VALUE="RESET">
	</div>
</section>
<section id="liste">
	<div class="content clearfix">
		<h2>6 associations correspondent à votre recherche</h2>
		<div class="filterlist clearfix">
			<div>
				<p>nom : <strong>"Nom recherche"</strong></p>
				<a href="#">X</a>
			</div>
			<div>
				<p>catégorie : <strong>"Environnement"</strong></p>
				<a href="#">X</a>
			</div>
			<div>
				<p>action en cours : <strong>Oui</strong></p>
				<a href="#">X</a>
			</div>
		</div>
		<div class="element second col-md-6 col-sm-12 col-xs-12">
			<div class="logo">
				<a href="detail.php">Voir la page</a>
				<img class="fond" src="<?php echo get_stylesheet_directory_uri(); ?>/css/images/fond_photo.png" alt="nothing"/>
				<img class="photo" src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo.jpg" alt="logo de l'association"/>
				<span></span>
			</div>
			<div class="infos">
				<h3>Association ASSAGA</h3>
				<p class="slog">"Parce que trouver des slogans qui tuent n'est pas notre métier"</p>
				<p class="categ">Catégories: Environnement, Sport</p>
			</div>
		</div>
		<div class="element second col-md-6 col-sm-12 col-xs-12">
			<div class="logo">
				<a href="detail.php">Voir la page</a>
				<img class="fond" src="<?php echo get_stylesheet_directory_uri(); ?>/css/images/fond_photo.png" alt="nothing"/>
				<img class="photo" src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo.jpg" alt="logo de l'association"/>
				<span></span>
			</div>
			<div class="infos">
				<h3>Association ASSAGA</h3>
				<p class="slog">"Parce que trouver des slogans"</p>
				<p class="categ">Catégories: Environnement, Sport</p>
			</div>
		</div>
		<div class="element second col-md-6 col-sm-12 col-xs-12">
			<div class="logo">
				<a href="detail.php">Voir la page</a>
				<img class="fond" src="<?php echo get_stylesheet_directory_uri(); ?>/css/images/fond_photo.png" alt="nothing"/>
				<img class="photo" src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo.jpg" alt="logo de l'association"/>
				<span></span>
			</div>
			<div class="infos">
				<h3>Association ASSAGA</h3>
				<p class="slog">"Parce que trouver des slogans qui tuent n'est pas notre métier"</p>
				<p class="categ">Catégories: Environnement, Sport</p>
			</div>
		</div>
	</div>
</section>
<?php get_footer() ?>