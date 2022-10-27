// default map layer


// app js called once  everytime we run file


//  for default buttons and all
let map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [22.532031, 75.924886 ],
    zoom: 10
});
    

function runDirection(start, end) {
    
    // recreating new map layer after removal
    // as we remove it after every form submission
    //  to avoid overlaps
    map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [22.532031 , 75.924886],
        zoom: 10
    });
    
    var dir = MQ.routing.directions();
    var time = dir.time;

    
    console.log(`The time is ${time}`)

    dir.route({
        locations: [start, end]
    });

    console.log(dir.distance)

    //object of custom route layer
    CustomRouteLayer = MQ.Routing.RouteLayer.extend({
        createStartMarker: (location) => {
            var custom_icon;
            var marker;

            custom_icon = L.icon({
                iconUrl: 'img/red.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

            return marker;
        },

        createEndMarker: (location) => {
            var custom_icon;
            var marker;

            custom_icon = L.icon({
                iconUrl: 'img/blue.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

            return marker;
        }
    });
    
    map.addLayer(new CustomRouteLayer({
        directions: dir,
        fitBounds: true   //fit to full screen?
    })); 
}




// function that runs when form submitted
//hooks up the form with the map

function submitForm(event) {
    //below line will prevent reloading of page , results on same page
    event.preventDefault();
    console.log("form submitted")

    // delete current map layer
    map.remove();

    // getting form data
    start = document.getElementById("start").value;
    end = document.getElementById("destination").value;

    // run directions function
    runDirection(start, end);

    // reset form
    document.getElementById("form").reset();
}

// asign the form to form variable
// to access elements by id
const form = document.getElementById('formId');

// call the submitForm() function when submitting the form
form.addEventListener('submit', submitForm);
                    //  name of event