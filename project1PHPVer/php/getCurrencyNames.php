<?php

    $result = file_get_contents('../data/Common-Currency.json');

    $decode = json_decode($result, true);

    $finalResult['exchange'] = [];

    foreach($decode['currency'][0] as $item){

        $temp[$item['code']] = $item['name'];

        array_push($finalResult['exchange'], $temp);   
    }

    $output['status']['code'] = 200;
    $output['status']['name'] = "success";
    $output['status']['description'] = "all ok";
    $output['data'] = $finalResult['exchange'][118];

      
    echo json_encode($output);

    ?>
    