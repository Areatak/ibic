<div class="mk-toggle-pane">
    <i><?php Mk_SVG_Icons::get_svg_icon_by_class_name(true, 'mk-moon-circle-small', 16, '#a9a942'); ?></i>
    <span style="font-size: 13px;text-align: justify;"><?php echo get_the_content();?></span>
<!--    --><?php //echo str_replace( ']]>', ']]&gt;', apply_filters( 'the_content', get_the_content() ) ); ?>
</div>