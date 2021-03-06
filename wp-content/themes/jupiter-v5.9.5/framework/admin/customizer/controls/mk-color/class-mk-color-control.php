<?php
/**
 * Customize API: MK_Color_Control class
 *
 * @package Jupiter
 * @subpackage MK_Customizer
 * @since 5.9.4
 */

/**
 * Customize Color Control class.
 *
 * @since 5.9.4
 *
 * @see MK_Control
 */
class MK_Color_Control extends MK_Control {

	/**
	 * Control type
	 *
	 * @var string $type
	 */
	public $type = 'mk-color';

	/**
	 * Enqueue control related scripts/styles.
	 */
	public function enqueue() {
		wp_enqueue_style( $this->type . '-control', THEME_CUSTOMIZER_URI . '/controls/' . $this->type . '/styles.css' );
		wp_enqueue_style( $this->type . '-control2', THEME_CUSTOMIZER_URI . '/controls/' . $this->type . '/alpha-color-picker.css' );
		wp_enqueue_script( $this->type . '-control3', THEME_CUSTOMIZER_URI . '/controls/' . $this->type . '/alpha-color-picker.js', array( 'jquery', 'wp-color-picker' ) );
		wp_enqueue_script( $this->type . '-control4', THEME_CUSTOMIZER_URI . '/controls/' . $this->type . '/scripts.js', array( 'jquery' ) );
	}

	/**
	 * Render the control's content.
	 */
	public function render_content() {
		?>
		<label>
			<div class="mk-control-wrap mk-control-color">
				<?php
				$this->render_input( array(
					'wrap_class' => 'mk-color-picker-holder',
				) );
				?>
			</div>
		</label>
		<?php
	}
}
