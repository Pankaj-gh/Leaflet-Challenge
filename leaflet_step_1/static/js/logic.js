// store API endpoint as query URL
var queryURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson'


d3.json(queryURL, function(data){
// d3.json(queryURL, data=>{
    console.log(data.features)


    createMap(data.features);

});