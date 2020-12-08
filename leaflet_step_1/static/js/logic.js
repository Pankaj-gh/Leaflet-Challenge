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


        L.circle([feature.geometry.coordinates[0], feature.geometry.coordinates[1]], {
            color: color,
            fillColor: color,
            fillOpacity: 0.75,
            radius: magnitude*50000
        }).bindPopup(`<h3> Magnitude: ${feature.properties.mag}</h3> <h3>Depth: ${feature.geometry.coordinates[2]}</h3> <p> ${feature.properties.place} </p>`).addTo(myMap)



    })

    var legend=L.control({
        position: 'bottomright'
        });
    
        legend.onAdd=function(){
            legendDiv=L.DomUtil.create('div', 'legend');
    
            // create rectangles to represent each "color"
            var colors = ['lightpink', 'lightcoral', 'deeppink', 'indianred', 'firebrick', 'darkred'];
            // under each rectangle would be the range of values
            var range = ['<100', '100-200', '200-300', '300-400', '400-500', '500+']
            // forEach
            for (var i=0; i <colors.length; i++){
                legendDiv.innerHTML +=
                '<li style="background-color:'+ colors [i] + '">' + range[i] + '</li>'
    
            }
        
            return legendDiv;
        }.addTo(myMap)
    };