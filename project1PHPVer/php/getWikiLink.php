<?php

  ini_set('display_errors', 'On');
  error_reporting(E_ALL);


  header('Content-Type: application/json; charset=UTF-8');
  header('Access-Control-Allow-Origin: *'); 

  $executionStartTime = microtime(true);


  $url = 'https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids='. $_REQUEST['pageid'] .'&inprop=url&format=json';

  $ch = curl_init();

  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_URL,$url);

  $result = curl_exec($ch);

  $cURLERROR = curl_errno($ch);
  
  curl_close($ch);

  if ($cURLERROR) {

    $output['status']['code'] = $cURLERROR;
    $output['status']['name'] = "Failure - cURL";
    $output['status']['description'] = curl_strerror($cURLERROR);
    $output['status']['seconds'] = number_format((microtime(true) - $executionStartTime), 3);
    $output['data'] = null;

  } else {

    $wikiPage = json_decode($result,true);

    if (json_last_error() !== JSON_ERROR_NONE) {

      $output['status']['code'] = json_last_error();
      $output['status']['name'] = "Failure - JSON";
      $output['status']['description'] = json_last_error_msg();
      $output['status']['seconds'] = number_format((microtime(true) - $executionStartTime), 3);
      $output['data'] = null;

    } else {


      if (isset($wikiPage['error'])) {

        $output['status']['name'] = "Failure - API";
        $output['status']['description'] = $wikiPage['info'];
        $output['status']['seconds'] = number_format((microtime(true) - $executionStartTime), 3);
        $output['data'] = null;

      } else {

        $finalResult['wikiPage'] = $wikiPage['query']['pages'][$_REQUEST['pageid']]['fullurl'];

        $output['status']['code'] = 200;
        $output['status']['name'] = "success";
        $output['status']['description'] = "all ok";
        $output['status']['seconds'] = number_format((microtime(true) - $executionStartTime), 3);
        $output['data'] = $finalResult;

      }

    }

  }

  echo json_encode($output, JSON_NUMERIC_CHECK); 

?>