<!DOCTYPE html>

<html <?php language_attributes(); ?>>
<head>
	<meta charset="utf-8">
	<meta content="IE-edge" http-equiv="X-UA-Compatible">

	<title><?php wp_title(); ?></title>
	<meta charset="<?php bloginfo('charset'); ?>">
	<!-- <meta name="description" content="<?php bloginfo( 'description' ); ?>"> -->
	<meta content="width=device-width,initial-scale=1" name="viewport">
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>">
	<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico" />
	<?php wp_head(); ?>
</head>
<header>
	<span></span>
	<div class="clearfix">
		<a href="./"><h1><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/caritaplace.png" alt="logo"/>CaritaPlace</h1></a>

		<div id="panier">
				<p><strong>20€</strong></p>
				<p><strong>VOS DONS <br /> 3</strong> associations</p>
				<a href="#">ACCEDER</a>
		</div>
		<span></span>
	</div>
</header>