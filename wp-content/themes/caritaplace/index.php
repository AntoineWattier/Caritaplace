<?php get_header(); ?>
<body>
<section id="map">
	<div id="filtre">
		<h2>PRECISEZ VOTRE RECHERCHE</h2>
		<a href="#">LES ASSOCIATIONS AUTOUR DE MOI</a>
		<form action="#">
			<div id="accordion">
				  <h3>Nom</h3>
				  <div>
				  	<input type="text" name="name" >
					<input type="submit" name="submit" VALUE="OK">
				  </div>
				  <h3>Catégorie</h3>
				  <div class="clearfix">
					<input type="checkbox" name="mode_paiement" value="Mastercard"> <label for="mode_paiement">Mastercard </label>
					<input type="checkbox" name="mode_paiement" value="Visa"> <label for="mode_paiement">Visa  </label>
					<input type="checkbox" name="mode_paiement" value="AmericanExpress"> <label for="mode_paiement">American Express </label>
				  </div>
				  <h3>Action en cours</h3>
				  <div class="clearfix">
					<input type="radio" name="mode_paiement" value="Mastercard"> <label for="mode_paiement">Oui </label>
					<input type="radio" name="mode_paiement" value="Visa"> <label for="mode_paiement">Non  </label>
				</div>
			</div>
		</form>
	</div>
	<div id="the_map">
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
		<div class="element second col-md-6">
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
		<div class="element second col-md-6">
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
		<div class="element second col-md-6">
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