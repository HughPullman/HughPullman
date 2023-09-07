<?php

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    $url = 'https://api.openweathermap.org/data/2.5/weather?lat='. $_REQUEST['lat'] . '&lon=' . $_REQUEST['lng'] . '&appid=201e0f10c238d28f325af124a681cb69';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

    curl_close($ch);

    $decode = json_decode($result,true);
    $output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $decode['weather'];
    $output['main'] = $decode['main'];
    $output['wind'] = $decode['wind'];
    

    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($output); 

    ?>