<!DOCTYPE html>

<html <?php language_attributes(); ?>>
<head>
	<meta charset="utf-8">
	<meta content="IE-edge" http-equiv="X-UA-Compatible">

	<title><?php wp_title(); ?></title>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta content="width=device-width,initial-scale=1" name="viewport">
	<?php wp_head(); ?>
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>">
	<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico" />

</head>
<header>
	<span></span>
	<div class="clearfix">
		<a href="<?php echo site_url() ?>"><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/caritaplace.png" alt="logo"/>CaritaPlace</a>
		<span></span>
	</div>
</header>
<!-- On doit instancier Paypal ici pour l'avoir dans toutes les pages -->
<script id="paypal" src="<?php echo get_stylesheet_directory_uri(); ?>/js/paypal-button-minicart.min.js"></script>