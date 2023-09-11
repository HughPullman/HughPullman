var myIcon = L.icon({
  iconUrl: 'img/personIcon.png',
  iconSize: [50, 50],
  className: 'personIcon'
})

var greenMarker = L.ExtraMarkers.icon({
  icon: 'fa-building',
  markerColor: 'green',
  shape: 'circle',
  prefix: 'fa'
});

function getCountryInfo (country) {


    $.ajax({
      url: "php/getCountryInfo.php",
      type: 'POST',
      dataType: 'json',
      data:{
        country: country
      },

      success: function(result) {

          if(result.status.name == "ok") {

            var area = result.data[0].areaInSqKm;
            var pop = result.data[0].population;

            $('#country').html(result.data[0].countryName);
            $('#capital').html(result.data[0].capital);
            $('#continent').html(result.data[0].continentName);
            $('#currency').html(result.data[0].currencyCode);
            $('#area').html(Number(area).toLocaleString());
            $('#population').html(Number(pop).toLocaleString());
            getWeather(result.data[0].north, result.data[0].south,result.data[0].east,result.data[0].west)
            getExchange(result.data[0].currencyCode);
            getCountryFlag(result.data[0].countryCode)
            getCities(result.data[0].north,result.data[0].south,result.data[0].east,result.data[0].west);

            var corner1 = L.latLng(result.data[0].north, result.data[0].west);
            var corner2 = L.latLng(result.data[0].south,result.data[0].east);
            bounds = L.latLngBounds(corner1, corner2);

            map.fitBounds([bounds]);
          }
      },
      error: function(jqXHR, textStatus, errorThrown){

      }
    });

  
};

function getWikiInfo (country) {

  $.ajax({
    url: "php/getWikiInfo.php",
    type: 'POST',
    dataType: 'json',
    data: {
        country: country
    },
    success: function(result) {


        if(result.status.name == "ok") {
            $('#wiki1').html(result.data[0].title);
            $('#wiki2').html(result.data[1].title);
            $('#wiki3').html(result.data[2].title);
            $('#wiki4').html(result.data[3].title);
            $('#wiki5').html(result.data[4].title);
            $('#wiki1Snippet').html(result.data[0].snippet + '...');
            $('#wiki2Snippet').html(result.data[1].snippet + '...');
            $('#wiki3Snippet').html(result.data[2].snippet + '...');
            $('#wiki4Snippet').html(result.data[3].snippet + '...');
            $('#wiki5Snippet').html(result.data[4].snippet + '...');

            getWikiLink(result.data[0].pageid, "#wiki1");
            getWikiLink(result.data[1].pageid,"#wiki2");
            getWikiLink(result.data[2].pageid,"#wiki3");
            getWikiLink(result.data[3].pageid, "#wiki4");
            getWikiLink(result.data[4].pageid, "#wiki5");


            
        }
    },
    error: function(jqXHR, textStatus, errorThrown){

    } 
});
}

async function getWikiLink (pageid, wikiId){

  return $.ajax({
    url: "php/getWikiLink.php",
    type: 'POST',
    dataType: 'json',
    data: {
        pageid: pageid
    },
    success: function(result) {


        if(result.status.name == "ok") {
          $(wikiId).attr("href", result.data);
        }
    },
    error: function(jqXHR, textStatus, errorThrown){

    } 
});
}

function getWeather (north, south, east, west){

    $.ajax({
      url: "php/getWeather.php",
      type: "POST",
      dataType: 'json',
      data: {
        north: north,
        south: south,
        east: east,
        west: west
      },
      success: function(result) {

        if(result.status.name === "ok"){
            var condition;
            if(result.data[0].weatherCondition === 'n\/a'){
              condition = 'Clear';
            } else{
              condition = result.data[0].weatherCondition;
            }
            $('#temp').html(result.data[0].temperature+ ' °C');
            $('#clouds').html(result.data[0].clouds);
            $('#humidity').html(result.data[0].humidity + ' %');
            $('#windSpeed').html(result.data[0].windSpeed + ' MPH');
            $('#condition').html(condition);
        }
      },
      error: function(jqXHR, textStatus, errorThrown){

      } 
    });
}

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

function getExchange (currency){
  $.ajax({
    url: "php/getExchange.php",
    type: "POST",
    dataType: 'json',

    success: function(result) {

      if(result.status.name === "ok"){
          $('#currencyExch').html([currency] + ' = ' + result.data[currency]);
      }
    },
    error: function(jqXHR, textStatus, errorThrown){

    } 
  });
}

async function myLocation() {
  map.locate({setView:'false'})
    .on('locationfound', async function(e){
      var countryCode = await getCountryCode(e.latitude,e.longitude);
      getCountryInfo(countryCode.data);
      getWeather(countryCode.data);
      setSelectedBorder(countryCode.data);
      getWikiInfo('UnitedKingdom');
      var marker = L.marker([e.latitude, e.longitude],{icon: myIcon}).bindPopup("You're are here");
            var circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
                weight: 1,
                color: 'green',
                fillColor: '#cacaca',
                fillOpacity: 0.2
            });
            map.addLayer(marker);
            map.addLayer(circle);
        })
       .on('locationerror', function(e){
            console.log(e);
            alert("Location access denied.");
            map.setView([54.5, -4], 6);
        });
   
}

$('#homebtn').click(function (){
  myLocation();
});

function getCountryFlag (countryCode) {
  $('#flagimg').attr("src", ("https://flagsapi.com/" + countryCode + "/flat/64.png"))
}

function getCities (north, south, east, west) {
    $.ajax({
      url: "php/getCities.php",
      type: "POST",
      dataType: 'json',
      data: {
        north: north,
        south: south,
        east: east,
        west: west
      },
      success: function(result) {

        if(result.status.name === "ok"){
          var markers = L.markerClusterGroup();
         
          for(let i = 0 ; i < result.data.length ; i++){
            var marker = L.marker([result.data[i].lat, result.data[i].lng], {icon: greenMarker}).bindPopup(result.data[i].toponymName);
            markers.addLayer(marker);
          }
        
          map.addLayer(markers);
            
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
      setNames(result.data);
    },
    error: function(jqXHR, textStatus, errorThrown){

    } 
  });
}

function setNames (data){
  for(let i = 0 ; i < data.length ; i++){
    $('#dropdown').append($('<option>', {
      value: data[i].properties.iso_a2,
      text: data[i].properties.name,
      id: data[i].properties.iso_a2
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
function setSelectedBorder (selectedIso){
  $.ajax({
    url: 'php/getCountries.php',
    type: 'POST',
    dataType: 'json',

    success: function(result) {
      if(i > 0){
        $(".leaflet-interactive").remove();
      }
      var borderGroup = new L.LayerGroup();
      borderGroup.addTo(map);
      var selectedData = result.data.find(item => item.properties.iso_a2 === selectedIso);
      var selectedLayer = L.geoJSON(selectedData); 
      borderGroup.addLayer(selectedLayer);
      i++;
    },
    error: function(jqXHR, textStatus, errorThrown){

    } 
  });
}


$('#dropdown').change(function() {
  var selected = document.querySelector('#dropdown');
  var value = selected.value;
  var text = $("#dropdown").find(":selected").text();
  var name = text.split(" ").join("");
  getCountryInfo(value);
  getWikiInfo(name);
  setSelectedBorder(value);


})


window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

$('#infobtn').click(function () {
  document.getElementById("info").classList.toggle("showinfo");
});

$('#wikibtn').click(function () {
  document.getElementById("wiki").classList.toggle("showinfo")
});

$('#weatherbtn').click(function () {
  document.getElementById("weather").classList.toggle("showinfo")
});

$('#exchangebtn').click( function (){
  document.getElementById("exchangeRate").classList.toggle("showinfo")
});

$('#flagbtn').click(function (){
  document.getElementById("flag").classList.toggle("showinfo")
});

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
   myLocation();
   getCountries();
};

var layerControl = L.control.layers(basemaps).addTo(map);

  