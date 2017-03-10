export class PowerPlant {
    constructor(geojson) {
        this.geojson = geojson;
        this._polygon = L.polygon(_(this.geojson.geometry.coordinates[0]).map(function(coords){ return L.latLng(coords.reverse()) }))

        var icon = L.icon({
            iconUrl: 'icons/power_plant.png',
            iconSize: [37, 49],
            iconAnchor: [15, 25],
            popupAnchor: [0, -25],
        });
        var coords = this._polygon.getBounds().getCenter();
        this._marker = L.marker(coords, {icon: icon});
        this._marker.bindPopup(this.name)
    }
    get polygon(){
        return this._polygon;
    }
    get name(){
        return `${this.geojson.properties['CD_TYPE']}: ${this.geojson.properties['NAME']} `;
    }

    get marker(){
        return this._marker;
    }
}
