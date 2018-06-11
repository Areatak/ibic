<?php

	/*
		Plugin Name: Aparat
		Plugin URI: https://wordpress.org/plugins/aparat/
		Description: نمایش ویدئوی آپارات در مطالب توسط شورت‌کد ...
		Version: 1.3
		Author: Nima Saberi
		Author URI: http://ideyeno.ir
		
	*/

	// [aparat id="iybdS"]
	// [aparat id="iybdS" width="600" height="450" style="margin: 15px; padding: 7px"]

	function aparat($atts) {
		extract( shortcode_atts( array(
			'id' => '',
			'width' => '100%',
			'height' => 450,
			'style' => 'margin: 15px 1px 10px 1px;'
		), $atts ) );
		return "<center style='{$style}'><iframe src='http://www.aparat.com/video/video/embed/videohash/{$id}/vt/frame' width='{$width}' height='{$height}' allowfullscreen='true' style='border:none!important'></iframe></center>";
	}
	add_shortcode( 'aparat', 'aparat' );

	function aparat_editor_btn($buttons) {
		array_push($buttons, "separator", "aparat_shortcode");
		return $buttons;
	}
	add_filter('mce_buttons', 'aparat_editor_btn', 0);

	function aparat_shortcode_register($plugin_array)	{
		$plugin_array['aparat_shortcode'] = plugins_url('tinyMCE/editor_plugin.js', __FILE__);
		return $plugin_array;
	}
	add_filter('mce_external_plugins', "aparat_shortcode_register");
	
?>