<?php

  ini_set('display_errors', 'On');
  error_reporting(E_ALL);


  header('Content-Type: application/json; charset=UTF-8');
  header('Access-Control-Allow-Origin: *'); 

  $executionStartTime = microtime(true);


  $url = 'http://api.geonames.org/countryInfoJSON?' . 'country=' . $_REQUEST['country'] . '&username=hughpullman';
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

    $countryInfo = json_decode($result,true);

    if (json_last_error() !== JSON_ERROR_NONE) {

      $output['status']['code'] = json_last_error();
      $output['status']['name'] = "Failure - JSON";
      $output['status']['description'] = json_last_error_msg();
      $output['status']['seconds'] = number_format((microtime(true) - $executionStartTime), 3);
      $output['data'] = null;

    } else {


      if (isset($countryInfo['error'])) {

        $output['status']['code'] = $countryInfo['error']['code'];
        $output['status']['name'] = "Failure - API";
        $output['status']['description'] = $countryInfo['error']['message'];
        $output['status']['seconds'] = number_format((microtime(true) - $executionStartTime), 3);
        $output['data'] = null;

      } else {

        $finalResult['capital'] = $countryInfo['geonames'][0]['capital'];
        $finalResult['continent'] = $countryInfo['geonames'][0]['continent'];
        $finalResult['currency'] = $countryInfo['geonames'][0]['currencyCode'];
        $finalResult['area'] = $countryInfo['geonames'][0]['areaInSqKm'];
        $finalResult['population'] = $countryInfo['geonames'][0]['population'];
        $finalResult['countryCode'] = $countryInfo['geonames'][0]['countryCode'];
        


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