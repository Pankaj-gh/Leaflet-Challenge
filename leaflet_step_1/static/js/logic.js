// store API endpoint as query URL
var queryURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson'


d3.json(queryURL, function(data){
// d3.json(queryURL, data=>{
    console.log(data.features)


    createMap(data.features);

});

// creating app and adding zoom levels
function createMap(data) {

    // Create a map object
    var myMap = L.map("mapid", {
        center: [15.5994, -28.6731],
        zoom: 3
    });
  
    // Adding tile layer
    L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        maxZoom: 18,
        id: "streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);



     // iterate through the data for each earthquake instance
     data.forEach(feature => {
        // set magnitude variable
        var magnitude = feature.properties.mag;
        var depth = feature.geometry.coordinates[2]
        console.log(depth)

        // switch statement for color
        var color = ''

        if (depth <= 100){
            color = 'lightpink';
        }
        else if (depth <= 200){
            color = 'lightcoral'
        }
        else if (magnitude <= 300){
            color ='deeppink'
        }

        else if (magnitude <= 400){
            color = 'indianred'
        }

        else if (magnitude <= 500) {
            color = 'firebrick'
        }
        else {
            color = 'darkred'
        }
