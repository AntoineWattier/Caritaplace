<?php get_header(); ?>
<body>
	<div class="superglobale">
	<section id="map" class="little">
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
	</section>
	<section id="informations">
	<?php if (have_posts()) : ?>
	  <?php while (have_posts()) : the_post(); ?>
		<div class="content clearfix">
			<div class="clearfix">
				<div class="element asso">
					<div>
						<h2>Association <?php the_title() ?></h2>
						<div class="logo">
							<img class="fond" src="<?php echo get_stylesheet_directory_uri(); ?>/css/images/fond_photo.png" alt="nothing"/>
							<img class="photo" src="<?php echo (get_field('logo') ? get_field('logo') : get_stylesheet_directory_uri()."/images/default.png") ?>" alt="logo de l'association"/>
							<?php if (get_field('slogan')) :  ?>
								<p class="slog">"<?php echo get_field('slogan') ?>"</p>
							<?php endif ?>
						</div>
						<span></span>
					</div>
					<div>
						<p><?php echo get_field('description') ?></p>
					</div>
				</div>
				<div class="element inf">
					<div>
						<h2>Informations</h2>
						<span></span>
					</div>
					<div>
						<p class="adherents"><strong><?php echo get_field('nombre_dadherents') ?></strong> adhérents</p>
						<p class="adresse" data-lat="<?php echo get_field('latitude') ?>" data-lng="<?php echo get_field('longitude') ?>"><?php echo get_field('adresse_de_lassociation') ?><br/> <?php echo get_field('code_postal')." ".get_field('ville') ?></p>
						<p class="categ">
							<strong>
							<?php  
					        $categories =  wp_get_post_terms($post->ID, 'categories');
						        foreach ($categories as $categorie) : 
						        	echo $categorie->name." ";
					      		endforeach; 
					      	?>
					      	</strong>
					    </p>
					    <?php $actions =  wp_get_post_terms($post->ID, 'action_en_cours');
						      if($actions[0]->slug =="en-cours") : ?>
									<p class="action"><strong>Action en cours : </strong><?php echo get_field('but_de_laction') ?></p>
							  <?php endif;?>
					</div>
				</div>
			</div>
				<div class="element donnez">
					<div>
						<h2>Vous aussi, faites un don et aidez cette association</h2>
						<span></span>
					</div>
					<div>
						<input type="text" class="giveMonney" name="rangeName" value="1;100"></input>			
						<script id="paypal" src="<?php echo get_stylesheet_directory_uri(); ?>/js/paypal-button-minicart.min.js?merchant=seller@testhetic.net" 
						    data-button="cart" 
						    data-name="<?php the_title() ?>" 
						    data-amount="5" 
						    data-currency="EUR" 
						    data-locale="fr_FR"
						    data-callback="<?php echo site_url() ?>/confirmation"
						    data-return="<?php echo site_url() ?>/confirmation"
						    data-env="sandbox"
						></script>
						<script type="text/javascript">
						PAYPAL.apps.MiniCart.render({

							//Ne marche pas correctement..
						    strings:{
						    button:"J\'ai fini",
						    subtotal:"TEST: ",
						    discount:"Discount: ",
						    shipping:"does not include shipping & tax",
						    processing:"En cours..."}
						});
						</script>
					</div>
				</div>
				<div class="element aussi">
					
						<?php	

						$args=array(
							'post__not_in' => array($post->ID),
							'posts_per_page'=>3,
							'caller_get_posts'=>1,
							'orderby' => 'rand',
							'post_type'=>'associations',
							'categories'=> $categories[0]->slug
						);
						$my_query = new WP_Query($args);
						if( $my_query->have_posts() ) { ?>
							<div>
								<h2>Ces associations pourraient également vous plaîre :</h2>
								<span></span>
							</div>
							<div>
							<?php while ($my_query->have_posts()) : $my_query->the_post(); ?>
								<a href="<?php echo the_permalink() ?>" class="otherElement">
									<div class="logo">
										<img class="fond" src="<?php echo get_stylesheet_directory_uri(); ?>/css/images/cercle.png" alt="nothing"/>
										<img class="photo" src="<?php echo (get_field('logo') ? get_field('logo') : get_stylesheet_directory_uri()."/images/default.png") ?>" alt="logo de l'association"/>
										<span></span>
									</div>
									<div class="other">
										<h3><?php echo the_title() ?></h3>
										<p class="categ">Catégories :
											<?php  
									        $categories =  wp_get_post_terms($post->ID, 'categories');
										        foreach ($categories as $categorie) : 
										        	echo $categorie->name." ";
									      		endforeach; 
									      	?>
										</p>
									</div>
								</a>
							<?php
							endwhile; ?>
							</div>
						<?php }
						wp_reset_query();
						
						?>
				
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