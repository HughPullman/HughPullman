var mapLocation = {};

function getLatLng (country){
  var lat = '';
  var lng = '';

    switch(country){
      case 'GB':
        lat = 55.3781;
        lng = -3.4360;
        break;
      case 'FR':
        lat = 46.2276;
        lng = 2.2137;
        break;
      case 'IT':
        lat = 41.8719;
        lng = 12.5674;
        break;
      case 'ES':
        lat = 40.4637;
        lng = -3.7492;
        break;
      case 'DE':
        lat = 51.1657;
        lng = 10.4515;
        break;
      case 'TH':
        lat = 15.87;
        lng = 100.9925;
        break;
      case 'IN':
        lat = 20.5937;
        lng = 78.9629;
        break;
      case 'US':
        lat = 37.0902;
        lng = -95.7129;
        break;
      case 'CN':
        lat = 35.8617;
        lng = 104.1954;
        break;
      case 'JP':
        lat = 36.2048;
        lng = 138.2529;
        break;
      case 'AU':
        lat = -25.2744;
        lng = 133.7751;
        break;
    }

    var coord = {
      lat: lat,
      lng: lng
    }
  
  return coord
}

function getCountryName(countryCode){

  var name = '';

  switch(countryCode){
    case 'GB':
      name = 'UnitedKingdom'
      break;
    case 'FR':
      name = 'France'
      break;
    case 'IT':
      name = 'Italy'
      break;
    case 'ES':
      name = 'Spain'
      break;
    case 'DE':
      name = 'Germany'
      break;
    case 'TH':
      name = 'Thailand'
      break;
    case 'IN':
      name = 'India'
      break;
    case 'US':
      name = 'UnitedStatesofAmerica'
      break;
    case 'CN':
      name = 'China'
      break;
    case 'JP':
      name = 'Japan'
      break;
    case 'AU':
      name = 'Australia'
      break;
  }

return name
}

function getCountryInfo (country) {

   var coor = getLatLng(country)

    $.ajax({
      url: "php/getCountryInfo.php",
      type: 'POST',
      dataType: 'json',
      data:{
        country: country
      },

      success: function(result) {

          if(result.status.name == "ok") {

              $('#lat').html(coor.lat.toFixed(3));
              $('#lng').html(coor.lng.toFixed(3));
              $('#country').html(result.data[0].countryName);
              $('#capital').html(result.data[0].capital);
              $('#continent').html(result.data[0].continentName);
              $('#currency').html(result.data[0].currencyCode);
              $('#area').html(result.data[0].areaInSqKm);
              $('#population').html(result.data[0].population);
              map.setView([coor.lat,coor.lng], 6);
              getExchange(result.data[0].currencyCode);
              getCountryFlag(result.data[0].countryCode)
              getCities(result.data[0].north,result.data[0].south,result.data[0].east,result.data[0].west);
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

function getWeather (country){
  var coor = getLatLng(country);

    $.ajax({
      url: "php/getWeather.php",
      type: "POST",
      dataType: 'json',
      data: {
        lat: coor.lat,
        lng: coor.lng,
      },
      success: function(result) {

        if(result.status.name === "ok"){
            $('#temp').html((result.main.temp - 273.15).toFixed(2) + ' °C');
            $('#pressure').html(result.main.pressure + ' hPa');
            $('#humidity').html(result.main.humidity + ' %');
            $('#windSpeed').html(result.wind.speed + ' MPH');
            $('#condition').html(result.data[0].description);
        }
      },
      error: function(jqXHR, textStatus, errorThrown){

      } 
    });
}

function dropdownFunc() {
  document.getElementById("dropdown").classList.toggle("show");
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
}

function getExchange (currency){
  $.ajax({
    url: "php/getExchange.php",
    type: "POST",
    dataType: 'json',

    success: function(result) {

      if(result.status.name === "ok"){
          $('#currencyExch').html([currency] + ' = ');
          $('#exchange').html(result.data[currency])
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
      var name = getCountryName(countryCode.data);
      getWikiInfo(name);
      var marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)');
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
            console.log(result.data);
            for(let i = 0 ; i < result.data.length ; i++){
              var marker = L.marker([result.data[i].lat, result.data[i].lng]).bindPopup(result.data[i].toponymName);
              map.addLayer(marker);
            }
            
        }
      },
      error: function(jqXHR, textStatus, errorThrown){

      } 
    });
}

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

function toggleInfo() {
  document.getElementById("info").classList.toggle("showinfo");
}

function toggleWiki() {
  document.getElementById("wiki").classList.toggle("showinfo")
}

function toggleWeather() {
  document.getElementById("weather").classList.toggle("showinfo")
}

function toggleExchange(){
  document.getElementById("exchangeRate").classList.toggle("showinfo")
}

function toggleFlag(){
  document.getElementById("flag").classList.toggle("showinfo")
}

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
};

var layerControl = L.control.layers(basemaps).addTo(map);

  