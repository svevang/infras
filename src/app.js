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

    var myIcon = L.icon({
        iconUrl: 'icons/power_plant.png',
        //iconRetinaUrl: 'my-icon@2x.png',
        iconSize: [37, 49],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        //shadowUrl: 'my-icon-shadow.png',
        //shadowRetinaUrl: 'my-icon-shadow@2x.png',
        //shadowSize: [68, 95],
        //shadowAnchor: [22, 94]
    });

    L.marker([18.2294,-66.4893], {icon: myIcon}).addTo(map);




}

window.installMap = installMap;

