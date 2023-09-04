$('#submitEarthquakeInfo').click(function() {

    $.ajax({
        url: "task/php/getEarthquakeInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            north: $('#inputNorth').val(),
            south: $('#inputSouth').val(),
            east: $('#inputEast').val(),
            west: $('#inputWest').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if(result.status.name == "ok") {
                console.log(result.data[0]);
                $('#txtDateTime').html(result.data[0].datetime);
                $('#txtDepth').html(result.data[0].depth);
                $('#txtLng').html(result.data[0].lng);
                $('#txtLat').html(result.data[0].lat);
                $('#txtMagnitude').html(result.data[0].magnitude);
            }
        },
        error: function(jqXHR, textStatus, errorThrown){

        } 
    });
});

$('#submitOceanInfo').click(function() {

    $.ajax({
        url: "task/php/getOceanInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: $('#inputLatitude').val(),
            lng: $('#inputLongitude').val()
        },
        success: function(result) {
            console.log(JSON.stringify(result));

            if(result.status.name == "ok"){

                $('#txtOcean').html(result.data.name);
            }
        }
    });
});

$('#submitWeatherInfo').click(function() {

    $.ajax({
        url: "task/php/getWeatherInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            north: $('#inputNorthW').val(),
            south: $('#inputSouthW').val(),
            east: $('#inputEastW').val(),
            west: $('#inputWestW').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if(result.status.name == "ok") {

                $('#txtTemperature').html(result.data[0].temperature);
                $('#txtHumidity').html(result.data[0].humidity);
                $('#txtLng').html(result.data[0].lng);
                $('#txtLat').html(result.data[0].lat);
                $('#txtWindSpeed').html(result.data[0].windSpeed);
                $('#txtStationName').html(result.data[0].stationName);
            }
        },
        error: function(jqXHR, textStatus, errorThrown){

        } 
    });    
});
