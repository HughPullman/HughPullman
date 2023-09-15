<?php

    $result = file_get_contents('../data/countryBorders.geo.json');

    $decode = json_decode($result, true);


	$finalResult['countries'] = [];

    foreach ($decode['features'] as $item) {

        $temp['name'] = $item['properties']['name'];
        $temp['iso_a2'] = $item['properties']['iso_a2'];

        array_push($finalResult['countries'], $temp);          

    }

    $output['data'] = $finalResult;
      
    echo json_encode($output);

    ?>