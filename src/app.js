import { PowerPlant } from './power_plant';

function installMap(domId){
    var map = L.map(domId).setView([18.2554, -66.3025], 8);

    L.tileLayer('puerto-rico-map-tiles/tiles/{z}/{x}/{y}.png', {
          minZoom: 8,
          bounds: [
              [17.4345,-67.8516,],
              [19.1452, -64.5557]
          ],
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    }).addTo(map);



}

window.installMap = installMap;

