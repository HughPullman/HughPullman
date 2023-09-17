
$('#infoModal').on('show.bs.modal', function getCountryInfo () {
  var selected = document.querySelector('#dropdown');
  var value = selected.value;

    $.ajax({
      url: "php/getCountryInfo.php",
      type: 'POST',
      dataType: 'json',
      data:{
        country: value
      },

      success: function(result) {

          if(result.status.code == 200) {

            var area = result.data.area;
            var pop = result.data.population;

            $('#capital').html(result.data.capital);
            $('#continent').html(result.data.continent);
            $('#currency').html(result.data.currency);
            $('#area').html(Number(area).toLocaleString());
            $('#population').html(Number(pop).toLocaleString());
            getCountryFlag(result.data.countryCode);

          }
      },
      error: function(jqXHR, textStatus, errorThrown){

      }
    });

  
});

$('#wikiModal').on('show.bs.modal', function getWikiInfo (e) {

  var country = $( "#dropdown option:selected" ).text();
  country = country.replace(/\s+/g, '');

  $.ajax({
    url: "php/getWikiInfo.php",
    type: 'POST',
    dataType: 'json',
    data: {
        country: country
    },
    success: function(result) {


        if(result.status.code == 200) {
            $('#wiki1').html(result.data.wiki[0].title);
            $('#wiki2').html(result.data.wiki[1].title);
            $('#wiki3').html(result.data.wiki[2].title);
            $('#wiki4').html(result.data.wiki[3].title);
            $('#wiki5').html(result.data.wiki[4].title);
            $('#wiki1Snippet').html(result.data.wiki[0].snippet + '...');
            $('#wiki2Snippet').html(result.data.wiki[1].snippet + '...');
            $('#wiki3Snippet').html(result.data.wiki[2].snippet + '...');
            $('#wiki4Snippet').html(result.data.wiki[3].snippet + '...');
            $('#wiki5Snippet').html(result.data.wiki[4].snippet + '...');

            getWikiLink(result.data.wiki[0].pageid, "#wiki1");
            getWikiLink(result.data.wiki[1].pageid,"#wiki2");
            getWikiLink(result.data.wiki[2].pageid,"#wiki3");
            getWikiLink(result.data.wiki[3].pageid, "#wiki4");
            getWikiLink(result.data.wiki[4].pageid, "#wiki5");

            $('#pre-load-wiki').addClass("fadeOut");
           
            
        }
    },
    error: function(jqXHR, textStatus, errorThrown){

    } 
});
})

$('#wikiModal').on('hidden.bs.modal', function (e) {
  $('#pre-load-wiki').removeClass("fadeOut");
  $('#wiki1').html('');
  $('#wiki2').html('');
  $('#wiki3').html('');
  $('#wiki4').html('');
  $('#wiki5').html('');
  $('#wiki1Snippet').html('');
  $('#wiki2Snippet').html('');
  $('#wiki3Snippet').html('');
  $('#wiki4Snippet').html('');
  $('#wiki5Snippet').html('');
  $('#wiki1').attr("href", '');
  $('#wiki2').attr("href", '');
  $('#wiki3').attr("href", '');
  $('#wiki4').attr("href", '');
  $('#wiki5').attr("href", '');
  
});

async function getWikiLink (pageid, wikiId){

  return $.ajax({
    url: "php/getWikiLink.php",
    type: 'POST',
    dataType: 'json',
    data: {
        pageid: pageid
    },
    success: function(result) {


        if(result.status.code == 200) {
          $(wikiId).attr("href", result.data.wikiPage);
        }
    },
    error: function(jqXHR, textStatus, errorThrown){

    } 
});
}

$('#holidayModal').on('show.bs.modal', function(){
  var selected = document.querySelector('#dropdown');
  var country = selected.value;

  $.ajax({
    url: "php/getHolidays.php",
    type: "GET",
    dataType: 'json',
    data:{
      country: country
    },

    success: function(result) {

      if(result.status.code === 200){      
        for(let i = 0 ; i < result.data.holidays.length ; i++){
          var $tr = $('<tr>').append(
            $('<td>').text(result.data.holidays[i].name),
            $('<td>').text(Date.parse(result.data.holidays[i].date).toString('MMMM dS'))
          );
          $('#holidayTable').append($tr);
        }
        $('#pre-load-holiday').addClass("fadeOut");
      } else {

      } 
    },
    error: function(jqXHR, textStatus, errorThrown){

    } 
  });
})

$('#holidayModal').on('hidden.bs.modal', function (e) {
  $('#holidayTable tr').remove();
  $('#pre-load-holiday').removeClass("fadeOut");  
});


$('#weatherModal').on('show.bs.modal', async function(e) {
    
  var selected = document.querySelector('#dropdown');
  var value = selected.value;
  var capital;

  await $.ajax({
    url: "php/getCapital.php",
    type: "POST",
    dataType: 'json',
    data: {
      country: value
    },
    success: function(result) {

      if(result.status.code === 200){
        capital = result.data;

      } else {

        $('#weatherModal .modal-title').replaceWith("Error retrieving data");

      } 
    },
    error: function(jqXHR, textStatus, errorThrown){
      $('#weatherModal .modal-title').replaceWith("Error retrieving data");
    } 
  });

  $.ajax({
    url: "php/getWeather.php",
    type: "POST",
    dataType: 'json',
    data: {
      capital: capital
    },
    success: function(result) {

      if(result.status.code === 200){

          $('#weatherModalLabel').html(result.data.location + ", " + result.data.country);       
          $('#todayConditions').html(result.data.forecast[0].conditionText);
          $('#todayIcon').attr("src", result.data.forecast[0].conditionIcon);
          $('#todayMaxTemp').html(result.data.forecast[0].maxC);
          $('#todayMinTemp').html(result.data.forecast[0].minC);         
          $('#day1Date').text(Date.parse(result.data.forecast[1].date).toString("ddd dS"));
          $('#day1Icon').attr("src", result.data.forecast[1].conditionIcon);
          $('#day1MinTemp').text(result.data.forecast[1].minC);
          $('#day1MaxTemp').text(result.data.forecast[1].maxC);        
          $('#day2Date').text(Date.parse(result.data.forecast[2].date).toString("ddd dS"));
          $('#day2Icon').attr("src", result.data.forecast[2].conditionIcon);
          $('#day2MinTemp').text(result.data.forecast[2].minC);
          $('#day2MaxTemp').text(result.data.forecast[2].maxC);  
          
          $('#pre-load-weather').addClass("fadeOut");

      } else {

        $('#weatherModal .modal-title').replaceWith("Error retrieving data");

      } 
    },
    error: function(jqXHR, textStatus, errorThrown){
      $('#weatherModal .modal-title').replaceWith("Error retrieving data");
    } 
  });
})

$('#weatherModal').on('hidden.bs.modal', function (e) {

  $('#pre-load-weather').removeClass("fadeOut");
  
  $('#todayConditions').html("");
  $('#todayIcon').attr("src", "");
  $('#todayMaxTemp').html("");
  $('#todayMinTemp').html("");
        
  $('#day1Date').text("");
  $('#day1Icon').attr("src", "");
  $('#day1MinTemp').text("");
  $('#day1MaxTemp').text("");
        
  $('#day2Date').text("");
  $('#day2Icon').attr("src", "");
  $('#day2MinTemp').text("");
  $('#day2MaxTemp').text("");
        
  $('#lastUpdated').text("");
  
});

function getCountryCode(lat, lng) {
  return $.ajax({
    url: "php/getCountryCode.php",
    type: "POST",
    dataType: 'json',
    data: {
      lat: lat,
      lng: lng,
    },
    success: function(result) {

      if(result.status.name === "ok"){
          return result.data
      }
    },
    error: function(jqXHR, textStatus, errorThrown){

    } 
  });
};

var currencyValues = {};

$('#exchangeModal').on('show.bs.modal', function (currency){
  

  $.ajax({
    url: "php/getExchange.php",
    type: "POST",
    dataType: 'json',

    success: function(result) {

      if(result.status.code === 200){
        currencyValues = result.data;
      }
    },
    error: function(jqXHR, textStatus, errorThrown){

    } 
  });

  $.ajax({
    url: "php/getCurrencyNames.php",
    type: "POST",
    dataType: 'json',

    success: function(result) {

      if(result.status.code === 200){
        for(const key in result.data){
          $('#exchangeRate').append($('<option>', {
            value: key,
            text: result.data[key],
          }))
        }
        $('#exchangeRate').val('USD');
        $('#toAmount').val(1);
        $('#pre-load-exchange').addClass("fadeOut");
      }
    },
    error: function(jqXHR, textStatus, errorThrown){

    } 
  });


});

function calcResult() {
  var selectedCur = document.querySelector('#exchangeRate');
  var selectedCurVal = selectedCur.value;
  var rate = currencyValues?.[selectedCurVal]

  $('#toAmount').val(Number($('#fromAmount').val() * rate).toLocaleString())
}

$('#fromAmount').on('keyup', function () {

  calcResult();

})

$('#fromAmount').on('change', function () {

  calcResult();

})

$('#exchangeRate').on('change', function () {

  calcResult();

})

$('#exchangeModal').on('show.bs.modal', function () {

  calcResult();

})




async function myLocation() {
  map.locate({setView:'false'})
    .on('locationfound', async function(e){
      var countryCode = await getCountryCode(e.latitude,e.longitude);
      setSelectedBorder(countryCode.data.countryCode);
      getCities(countryCode.data.countryCode);
      $('#dropdown').val(countryCode.data.countryCode);
        })
       .on('locationerror', function(e){
            console.log(e);
            alert("Location access denied.");
        });
};


function getCountryFlag (countryCode) {
  $('#flagimg').attr("src", ("https://flagsapi.com/" + countryCode + "/flat/64.png"))
}

var j = 0;
var y = 0;
var prevMarkers;
var  prevMarkersAirport;

function getCities (country) {
    $.ajax({
      url: "php/getCities.php",
      type: "POST",
      dataType: 'json',
      data: {
        country: country
      },
      success: function(result) {

        if(result.status.code === 200){
          if(j > 0){
            prevMarkers.clearLayers();
          }

          var markers = L.markerClusterGroup({
            polygonOptions: {
              fillColor: '#fff',
              color: '#000',
              weight:2,
              opacity:1,
              fillOpacity:0.5
            }}).addTo(map);
         
          for(let i = 0 ; i < result.data.cities.length ; i++){
            var marker = L.marker([result.data.cities[i].lat, result.data.cities[i].lng], {icon: greenMarker}).bindTooltip("<div class='col text-center'><strong>" + result.data.cities[i].name + "</strong><br><i>(" + (result.data.cities[i].population).toLocaleString() + ")</i></div>", {direction: 'top', sticky: true});
            markers.addLayer(marker);
          }
          
          prevMarkers = markers;
          j++;
        }
      },
      error: function(jqXHR, textStatus, errorThrown){

      } 
    });

    $.ajax({
      url: "php/getAirports.php",
      type: "POST",
      dataType: 'json',
      data: {
        country: country
      },
      success: function(result) {

        if(result.status.code === 200){
          if(y > 0){
            prevMarkersAirport.clearLayers();
          }

          var markersAirport = L.markerClusterGroup({
            polygonOptions: {
              fillColor: '#fff',
              color: '#000',
              weight:2,
              opacity:1,
              fillOpacity:0.5
            }}).addTo(map);
         
          for(let i = 0 ; i < result.data.airports.length ; i++){
            var markerAirport = L.marker([result.data.airports[i].lat, result.data.airports[i].lng], {icon: redMarker}).bindTooltip(result.data.airports[i].name, {direction: 'top', sticky: true});
            markersAirport.addLayer(markerAirport);
          }
          
          prevMarkersAirport = markersAirport;
          y++;
        }
      },
      error: function(jqXHR, textStatus, errorThrown){

      } 
    });
}

function getCountries () {

  $.ajax({
    url: 'php/getCountries.php',
    type: 'POST',
    dataType: 'json',

    success: function(result) {
      setNames(result.data.countries);
      myLocation();
    },
    error: function(jqXHR, textStatus, errorThrown){

    } 
  });
}

function setNames (data){
  for(let i = 0 ; i < data.length ; i++){
    $('#dropdown').append($('<option>', {
      value: data[i].iso_a2,
      text: data[i].name,
      id: data[i].iso_a2
    }))
  }
  $("#dropdown").append($("#dropdown option")
                              .remove().sort(function(a, b) {
                var at = $(a).text(),
                    bt = $(b).text();
                return (at > bt) ? 1 : ((at < bt) ? -1 : 0);
            }));
}


var i = 0;
var prevGroup;
function setSelectedBorder (selectedIso){
  $.ajax({
    url: 'php/getBorders.php',
    type: 'POST',
    dataType: 'json',

    success: function(result) {

      if(i > 0){
        map.removeLayer(prevGroup);
      }
      var borderGroup = new L.LayerGroup();
      borderGroup.addTo(map);
      var selectedData = result.data.features.find(item => item.properties.iso_a2 === selectedIso);
      var selectedLayer = L.geoJSON(selectedData); 
      borderGroup.addLayer(selectedLayer);
      map.fitBounds(selectedLayer.getBounds())
      prevGroup = borderGroup;
      
      i++;
    },
    error: function(jqXHR, textStatus, errorThrown){

    } 
  });
}

$('#newsModal').on('show.bs.modal', function(e) {
  var selected = document.querySelector('#dropdown');
  var value = selected.value;

  $.ajax({
    url: "php/getNews.php",
    type: "GET",
    dataType: 'json',
    data: {
      country: value
    },
    success: function(result) {

      if(result.status.code === 200){

        result.data.news[0].image ? $('#newsImg1').attr('src', result.data.news[0].image) : $('#newsImg1').attr('src', '/project1PHPVer/img/No_image_available.svg.png') ;
        result.data.news[1].image ? $('#newsImg2').attr('src', result.data.news[1].image) : $('#newsImg2').attr('src', '/project1PHPVer/img/No_image_available.svg.png') ;
        result.data.news[2].image ? $('#newsImg3').attr('src', result.data.news[2].image) : $('#newsImg3').attr('src', '/project1PHPVer/img/No_image_available.svg.png') ;
        result.data.news[3].image ? $('#newsImg4').attr('src', result.data.news[3].image) : $('#newsImg4').attr('src', '/project1PHPVer/img/No_image_available.svg.png') ;
        result.data.news[4].image ? $('#newsImg5').attr('src', result.data.news[4].image) : $('#newsImg5').attr('src', '/project1PHPVer/img/No_image_available.svg.png') ;
        result.data.news[0].title ? $('#newsTitle1').html(result.data.news[0].title) : $('#newsTitle1').html('No News Available');
        result.data.news[0].url ? $('#newsTitle1').attr('href', result.data.news[0].url) : '';
        result.data.news[1].title ?  $('#newsTitle2').html(result.data.news[1].title)  : $('#newsTitle2').html('No News Available');
        result.data.news[1].url ?  $('#newsTitle2').attr('href', result.data.news[1].url) : '';
        result.data.news[2].title ?  $('#newsTitle3').html(result.data.news[2].title)  : $('#newsTitle3').html('No News Available');
        result.data.news[2].url ?  $('#newsTitle3').attr('href', result.data.news[2].url) : '';
        result.data.news[3].title ?  $('#newsTitle4').html(result.data.news[3].title)  : $('#newsTitle4').html('No News Available');
        result.data.news[3].url ?  $('#newsTitle4').attr('href', result.data.news[3].url) : '';
        result.data.news[4].title ?  $('#newsTitle5').html(result.data.news[4].title)  : $('#newsTitle5').html('No News Available');
        result.data.news[4].url ?  $('#newsTitle5').attr('href', result.data.news[4].url) : '';
        result.data.news[0].author ? $('#newsAuthor1').html(result.data.news[0].author) : '' ;
        result.data.news[1].author ? $('#newsAuthor2').html(result.data.news[1].author) : '' ;
        result.data.news[2].author ? $('#newsAuthor3').html(result.data.news[2].author) : '' ;
        result.data.news[3].author ? $('#newsAuthor4').html(result.data.news[3].author) : '' ;
        result.data.news[4].author ? $('#newsAuthor5').html(result.data.news[4].author) : '' ;

        $('#pre-load-news').addClass("fadeOut");
        

      } else {

      } 
    },
    error: function(jqXHR, textStatus, errorThrown){
      
    } 
  });
})

$('#newsModal').on('hidden.bs.modal', function (e) {
  $('#pre-load-news').removeClass("fadeOut");
  $('#newsImg1').attr('src', '');
  $('#newsImg2').attr('src', '');
  $('#newsImg3').attr('src', '');
  $('#newsImg4').attr('src', '');
  $('#newsImg5').attr('src', '');
  $('#newsTitle1').html('');
  $('#newsTitle1').attr('href', '');
  $('#newsTitle2').html('');
  $('#newsTitle2').attr('href', '');
  $('#newsTitle3').html('');
  $('#newsTitle3').attr('href', '');
  $('#newsTitle4').html('');
  $('#newsTitle4').attr('href', '');
  $('#newsTitle5').html('');
  $('#newsTitle5').attr('href', '');
  $('#newsAuthor1').html('');
  $('#newsAuthor2').html('');
  $('#newsAuthor3').html('');
  $('#newsAuthor4').html('');
  $('#newsAuthor5').html('');
 
  
});



$('#dropdown').change(function() {
  var selected = document.querySelector('#dropdown');
  var value = selected.value;
  setSelectedBorder(value);
  getCities(value);
})

var streets = L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
);

var satellite = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
  }
);
var basemaps = {
  "Streets": streets,
  "Satellite": satellite
};



var map = L.map("map", {
  layers: [streets]
});

window.onload = () => {
   getCountries();
};

var layerControl = L.control.layers(basemaps).addTo(map);

var myIcon = L.icon({
  iconUrl: 'img/personIcon.png',
  iconSize: [50, 50],
  className: 'personIcon'
})

var greenMarker = L.ExtraMarkers.icon({
  icon: 'fa-building',
  markerColor: 'green',
  shape: 'square',
  prefix: 'fa'
});

var redMarker = L.ExtraMarkers.icon({
  icon: 'fa fa-plane',
  markerColor: 'red',
  shape: 'square',
  prefix: 'fa'
})

L.easyButton("fa-circle-info fa-xl", function (btn, map) {
  
  $('#infoModal').modal("show");
  
}).addTo(map);

L.easyButton("fa fa-thermometer-full fa-xl", function (btn, map) {
  
  $('#weatherModal').modal("show");
  
}).addTo(map);


L.easyButton("fa fa-wikipedia-w fa-xl", function (btn, map) {
  
  $('#wikiModal').modal("show");

}).addTo(map);

L.easyButton("fa fa-newspaper-o fa-xl", function (btn, map) {
  
  $('#newsModal').modal("show");
  
}).addTo(map);


L.easyButton("fa fa-sun-o fa-xl", function (btn, map) {
  
  $('#holidayModal').modal("show");
  
}).addTo(map);

L.easyButton("fa fa-money fa-xl", function (btn, map) {
  
  $('#exchangeModal').modal("show");
  
}).addTo(map);


  