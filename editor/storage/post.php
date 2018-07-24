<?php if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

class Brizy_Editor_Storage_Post extends Brizy_Editor_Storage_Abstract {

	const META_KEY = 'brizy';

	protected $id;

	/**
	 * @param $id
	 *
	 * @return Brizy_Editor_Storage_Post
	 */
	public static function instance( $id ) {
		return new self( $id );
	}

	protected function __construct( $id ) {
		$this->id = (int) $id;
	}

	protected function get_id() {
		return $this->id;
	}

	/**
	 * @return array
	 */
	public function get_storage() {
		$get_metadata = get_metadata( 'post', $this->get_id(), $this->key(), true );

		if ( is_array( $get_metadata ) ) {
			return $get_metadata;
		}

		return array();
	}

	/**
	 * @param array $storage
	 *
	 * @return $this
	 */
	protected function update_storage( $storage ) {

//		if(isset($storage['brizy-post']['editor_data']))
//		{
//			$storage['brizy-post']['editor_data'] = addslashes($storage['brizy-post']['editor_data']);
//		}
//		if(isset($storage['brizy-post']['compiled_html']))
//		{
//			$storage['brizy-post']['compiled_html'] = addslashes($storage['brizy-post']['compiled_html']);
//		}

		update_metadata( 'post', $this->get_id(), $this->key(), $storage );

		return $this;
	}

	protected function key() {
		return self::META_KEY;
	}
}