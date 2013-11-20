<?php 
wp_enqueue_script("jquery");

wp_localize_script('mylib', 'WPURLS', array( 'siteurl' => get_option('siteurl') )); 


?>