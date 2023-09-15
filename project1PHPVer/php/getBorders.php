<?php

    $result = file_get_contents('../data/countryBorders.geo.json');

    $decode = json_decode($result, true);


    $output['data'] = $decode;

      
    echo json_encode($output);

    ?>