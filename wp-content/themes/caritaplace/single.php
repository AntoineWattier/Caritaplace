<?php get_header(); ?>
<section id="map" class="little">
	<div id="the_map">
	</div>
</section>
<section id="informations">
<?php if (have_posts()) : ?>
  <?php while (have_posts()) : the_post(); ?>
	<div class="content clearfix">
		<div class="clearfix">
			<div class="element first">
				<div class="top">
					<h2>Association <?php the_title() ?></h2>
					<div class="logo">
						<img class="fond" src="<?php echo get_stylesheet_directory_uri(); ?>/css/images/fond_photo.png" alt="nothing"/>
						<img class="photo" src="<?php echo get_field('logo') ?>" alt="logo de l'association"/>
						<p class="slog">"<?php echo get_field('slogan') ?>"</p>
					</div>
					<span></span>
				</div>
				<div class="infos">
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut viverra erat. Donec consectetur nibh nec enim tempus, sit amet fermentum odio commodo. Mauris venenatis risus malesuada tortor pulvinar volutpat.</p>
					<p>Nam ligula est, pellentesque suscipit felis volutpat, vestibulum sollicitudin sem. Cras ut sapien orci.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut viverra erat. Donec consectetur nibh nec enim tempus, sit amet fermentum odio commodo. Mauris venenatis risus malesuada tortor pulvinar volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut viverra erat. </p>
				</div>
			</div>
			<div class="element second">
				<div class="top">
					<h2>Informations</h2>
					<span></span>
				</div>
				<div class="infos">
					<p class="adherents"><strong><?php echo get_field('nombre_dadherents') ?></strong> adhérents</p>
					<p class="adresse"><?php echo get_field('adresse_de_lassociation') ?><br/> <?php echo get_field('code_postal')." ".get_field('ville') ?></p>
				</div>
			</div>
		</div>
			<div class="element third">
				<div class="top">
					<h2>Vous aussi, faites un don et aidez cette association</h2>
					<span></span>
				</div>
				<div class="infos">
					<form action="#">
						<input type="text" class="giveMonney" name="rangeName" value="1;100"></input>
						<input type="submit" value="DONNER"></input>
					</form>
				</div>
			</div>
			<div class="element fourth">
				<div class="top">
					<h2>Ces associations pourraient également vous plaîre :</h2>
					<span></span>
				</div>
				<div class="infos">
					<a href="" class="otherElement">
						<div class="logo">
							<img class="fond" src="css/images/cercle.png" alt="nothing"/>
							<img class="photo" src="images/logo.jpg" alt="logo de l'association"/>
							<span></span>
						</div>
						<div class="other blue">
							<h3>Association ASSAGA</h3>
							<p class="categ">Catégories: Environnement, Sport</p>
						</div>
					</a>
					<a href="" class="otherElement">
						<div class="logo">
							<img class="fond" src="css/images/cercle.png" alt="nothing"/>
							<img class="photo" src="images/logo.jpg" alt="logo de l'association"/>
							<span></span>
						</div>
						<div class="other orange">
							<h3>Association ASSAGA</h3>
							<p class="categ">Catégories: Environnement, Sport</p>
						</div>
					</a>
					<a href="" class="otherElement">
						<div class="logo">
							<img class="fond" src="css/images/cercle.png" alt="nothing"/>
							<img class="photo" src="images/logo.jpg" alt="logo de l'association"/>
							<span></span>
						</div>
						<div class="other green">
							<h3>Association ASSAGA</h3>
							<p class="categ">Catégories: Environnement, Sport</p>
						</div>
					</a>
				</div>
			
		</div>
	</div>
  <?php endwhile; ?>
<?php else : ?>
  <p class="nothing">
    Il n'y a pas d'associations à afficher !
  </p>
<?php endif; ?>
</section>
<?php get_footer(); ?>