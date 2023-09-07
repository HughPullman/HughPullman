<?php

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    $url = 'https://ipapi.co/json';

    $ch = curl_init();
    try {
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

    if ($result === false) {
        throw new Exception(curl_error($ch), curl_errno($ch));
    }

    curl_close($ch);

    

    $decode = json_decode($result,true);
    $output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $decode;
    $output['result'] = $result;

    }catch(Exception $e) {

        trigger_error(sprintf(
            'Curl failed with error #%d: %s',
            $e->getCode(), $e->getMessage()),
            E_USER_ERROR);
        }
    

    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($output); 

    ?>