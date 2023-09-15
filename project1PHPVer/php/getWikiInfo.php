<?php

  ini_set('display_errors', 'On');
  error_reporting(E_ALL);


  header('Content-Type: application/json; charset=UTF-8');
  header('Access-Control-Allow-Origin: *'); 

  $executionStartTime = microtime(true);


  $url = 'https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=' . $_REQUEST['country'] . '&format=json' ;

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

    $wiki = json_decode($result,true);

    if (json_last_error() !== JSON_ERROR_NONE) {

      $output['status']['code'] = json_last_error();
      $output['status']['name'] = "Failure - JSON";
      $output['status']['description'] = json_last_error_msg();
      $output['status']['seconds'] = number_format((microtime(true) - $executionStartTime), 3);
      $output['data'] = null;

    } else {


      if (isset($wiki['error'])) {

        $output['status']['name'] = "Failure - API";
        $output['status']['description'] = $wiki['info'];
        $output['status']['seconds'] = number_format((microtime(true) - $executionStartTime), 3);
        $output['data'] = null;

      } else {

        $finalResult['wiki'] = [];

        foreach ($wiki['query']['search'] as $item) {

          $temp['title'] = $item['title'];
          $temp['pageid'] = $item['pageid'];
          $temp['snippet'] = $item['snippet'];

          array_push($finalResult['wiki'], $temp);          

        }

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