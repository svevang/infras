import { PowerPlant } from './power_plant';

function installMap(domId){
    var map = L.map(domId).setView([18.2554, -66.3025], 10);

    L.tileLayer('puerto-rico-map-tiles/tiles/{z}/{x}/{y}.png', {
          minZoom: 8,
          bounds: [
              [9.9905, -83.0676],
              [26.6082,-54.1076]
          ],
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    }).addTo(map);

    $.getJSON('plantas_electricas.json')
    .done(function(data){
        _(data.features).map(function(feature){
            var coords = feature.geometry.coordinates[0][0]
            var powerPlant = new PowerPlant(feature)

            console.log(coords)
            powerPlant.polygon.addTo(map)
            powerPlant.marker.addTo(map)
            //L.marker([coords[1], coords[0]], {icon: myIcon}).addTo(map);
        });

        }).fail(function(){
            console.log('Failed to fetch the power plant data');
        });
};

window.installMap = installMap;

