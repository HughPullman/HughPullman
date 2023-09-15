<?php

  ini_set('display_errors', 'On');
  error_reporting(E_ALL);


  header('Content-Type: application/json; charset=UTF-8');
  header('Access-Control-Allow-Origin: *'); 

  $executionStartTime = microtime(true);


  $url = 'https://date.nager.at/api/v3/publicholidays/2023/' . $_REQUEST['country'];

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

    $holidays = json_decode($result,true);

    if (json_last_error() !== JSON_ERROR_NONE) {

      $output['status']['code'] = json_last_error();
      $output['status']['name'] = "Failure - JSON";
      $output['status']['description'] = json_last_error_msg();
      $output['status']['seconds'] = number_format((microtime(true) - $executionStartTime), 3);
      $output['data'] = null;

    } else {


      if (isset($holidays['error'])) {

        $output['status']['name'] = "Failure - API";
        $output['status']['description'] = $holidays['info'];
        $output['status']['seconds'] = number_format((microtime(true) - $executionStartTime), 3);
        $output['data'] = null;

      } else {

        $finalResult['holidays'] = [];

        foreach ($holidays as $item){

            $temp['date'] = $item['date'];
            $temp['name'] = $item['name'];

            array_push($finalResult['holidays'], $temp);
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