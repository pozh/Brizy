<?php if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

class Brizy_Editor_API_Project {

	private $data;

	public function __construct( $data ) {
		$defaults   = array( 'title' => '', 'globals' => array() );
		$this->data = array_merge( $defaults, $data );
	}

	public function get_data() {
		return $this->data;
	}

	public function get_id() {
		return $this->data['id'];
	}

	public function set_id( $id ) {
		return $this->data['id'] = (int) $id;
	}

	public function get_globals() {
		return json_decode( $this->data['globals'] );
	}

	public function set_globals( $globals ) {
		return $this->data['globals'] = json_encode( $globals );
	}

	/**
	 * @return string
	 */
	public function get_template_slug() {
		$data = $this->get_data();

		return $data['template']['slug'];
	}

	/**
	 * @return string
	 */
	public function get_template_version() {
		$data = $this->get_data();

		return $data['version'];
	}

	/**
	 * @param $version
	 *
	 * @return $this
	 */
	public function set_template_version( $version ) {
		$this->data['version'] = $version;

		return $this;
	}

	public function __sleep() {
		return array( 'data' );
	}

	public function set_meta_key( $key, $value ) {

		if ( is_null( $key ) ) {
			throw new InvalidArgumentException( 'Hte key parameter should not be null' );
		}

		$this->data['meta_data'][ $key ] = $value;
	}

}