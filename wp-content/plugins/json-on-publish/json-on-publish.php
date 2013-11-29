<?php
/*
Plugin Name: JSON on Publish
Plugin URI: http://yourdomain.com/
Description: Used to refresh JSON file from all posts when one is published.
Version: 1.0
Author: Antoine Wattier
Author URI: http://yourdomain.com
*/


//Retourne les lat lng en fonction d'une adresse postale
function geocode($street_address,$city,$state){
        
    $street_address = str_replace(" ", "+", $street_address); //google doesn't like spaces in urls, but who does?
    $city = str_replace(" ", "+", $city);
    $state = str_replace(" ", "+", $state);

    $url = "http://maps.googleapis.com/maps/api/geocode/json?address=$street_address,+$city,+$state&sensor=false"; 
    $google_api_response = wp_remote_get( $url );    

    $results = json_decode( $google_api_response['body'] ); //grab our results from Google
    $results = (array) $results; //cast them to an array
    $status = $results["status"]; //easily use our status
    $location_all_fields = (array) $results["results"][0];
    $location_geometry = (array) $location_all_fields["geometry"];
    $location_lat_long = (array) $location_geometry["location"];

    // echo "<!-- GEOCODE RESPONSE " ;
    // var_dump( $location_lat_long );
    // echo " -->";

    if( $status == 'OK'){
        $latitude = $location_lat_long["lat"];
        $longitude = $location_lat_long["lng"];
    }else{
        $latitude = '';
        $longitude = '';
    }

    $return = array(
                'latitude'  => $latitude,
                'longitude' => $longitude
                );
    return $return;
}

//Met a jour le fichier JSON
function json_post($post_id) {
    // $post = get_post($post_id);
    // $fields = get_fields($post_id);
    $content = array();

    //On récupère les lat lng en fonction de l'adresse
    $coords = geocode(get_field('adresse_de_lassociation',$post_id),get_field('ville',$post_id),"FRANCE");
    // $fields['latitude'] = $coords['latitude'];
    // $fields['longitude'] = $coords['longitude'];


    update_field('field_528e0e4107a59', $coords['latitude'], $post_id);
    update_field('field_528e0e5207a5a', $coords['longitude'], $post_id);


    //array_push($content,$fields);

   

    $tmp = array();
    foreach(get_posts( array('post_type'=> 'associations')) as $key=>$value){
        $id=$value->ID;

        $tmp = get_fields($id);
        $tmp['nom']=get_the_title($id);
        $tmp['permalink']=get_permalink($id);
        $tmp['categories']=wp_get_post_terms($id,'categories');
        $tmp['action_en_cours']=wp_get_post_terms($id,'action_en_cours');

        array_push($content, $tmp);
    }

    $content = json_encode($content);

    $fp = fopen(get_stylesheet_directory()."/associations.json","wb");
    fwrite($fp,$content);
    fclose($fp);

}

add_action('acf/save_post', 'json_post', 99);
add_action('trashed_post', 'json_post', 99);

/**
 * Tests if any of a post's assigned categories are descendants of target categories
 *
 * @param int|array $cats The target categories. Integer ID or array of integer IDs
 * @param int|object $_post The post. Omit to test the current post in the Loop or main query
 * @return bool True if at least 1 of the post's categories is a descendant of any of the target categories
 * @see get_term_by() You can get a category by name or slug, then pass ID to this function
 * @uses get_term_children() Passes $cats
 * @uses in_category() Passes $_post (can be empty)
 * @version 2.7
 * @link http://codex.wordpress.org/Function_Reference/in_category#Testing_if_a_post_is_in_a_descendant_category
 */
 
if ( ! function_exists( 'post_is_in_descendant_category' ) ) {
    function post_is_in_descendant_category( $cats, $_post = null ) {
        foreach ( (array) $cats as $cat ) {
            // get_term_children() accepts integer ID only
            $descendants = get_term_children( (int) $cat, 'category' );
            if ( $descendants && in_category( $descendants, $_post ) )
                return true;
        }
        return false;
    }
}
?>