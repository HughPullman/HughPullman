<?php

    $result = file_get_contents('https://hughcwpullman.co.uk/map/data/countryBorders.geo.json');

    $decode = json_decode($result, true);

	$output['data'] = $decode['features'];

    echo json_encode($output);

    ?>