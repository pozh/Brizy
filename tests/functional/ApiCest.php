<?php


class ApiCest {


	public function _before( FunctionalTester $I ) {
		wp_cache_flush();
		$I->loginAs( 'admin', 'admin' );
	}


	/**
	 * @param AcceptanceTester $I
	 */
	public function getServerTimestampTest( FunctionalTester $I ) {

		$I->sendAjaxGetRequest( 'wp-admin/admin-ajax.php?'. build_query([ 'action' => 'brizy_timestamp' ]) );
		$I->seeResponseCodeIs( 200 );

		$response = $I->grabResponse();
		$object = json_decode( $response );


		$I->assertTrue( isset($object->timestamp), 'It should contain timestamp property' );

	}
}