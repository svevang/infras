(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _power_plant = require('./power_plant');

function installMap(domId) {
    var map = L.map(domId).setView([18.2554, -66.3025], 10);

    L.tileLayer('puerto-rico-map-tiles/tiles/{z}/{x}/{y}.png', {
        detectRetina: false,
        minZoom: 10,
        maxZoom: 16,
        bounds: [[17.8183, -68.0852], [18.6010, -65.0969]],
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>'
    }).addTo(map);

    $.getJSON('plantas_electricas.json').done(function (data) {
        _(data.features).map(function (feature) {
            var coords = feature.geometry.coordinates[0][0];
            var powerPlant = new _power_plant.PowerPlant(feature);

            powerPlant.polygon.addTo(map);
            powerPlant.marker.addTo(map);
            //L.marker([coords[1], coords[0]], {icon: myIcon}).addTo(map);
        });
    }).fail(function () {
        console.log('Failed to fetch the power plant data');
    });
};

window.installMap = installMap;


},{"./power_plant":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PowerPlant = exports.PowerPlant = function () {
    function PowerPlant(geojson) {
        _classCallCheck(this, PowerPlant);

        this.geojson = geojson;
        this._polygon = L.polygon(_(this.geojson.geometry.coordinates[0]).map(function (coords) {
            return L.latLng(coords.reverse());
        }));

        var icon = L.icon({
            iconUrl: 'icons/power_plant.png',
            iconSize: [37, 49],
            iconAnchor: [15, 25],
            popupAnchor: [0, -25]
        });
        var coords = this._polygon.getBounds().getCenter();
        this._marker = L.marker(coords, { icon: icon });
        this._marker.bindPopup(this.name);
    }

    _createClass(PowerPlant, [{
        key: 'polygon',
        get: function get() {
            return this._polygon;
        }
    }, {
        key: 'name',
        get: function get() {
            return this.geojson.properties['CD_TYPE'] + ': ' + this.geojson.properties['NAME'] + ' ';
        }
    }, {
        key: 'marker',
        get: function get() {
            return this._marker;
        }
    }]);

    return PowerPlant;
}();


},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = exports.Rectangle = function Rectangle(height, width) {
    _classCallCheck(this, Rectangle);

    this.height = height;
    this.width = width;
};


},{}]},{},[1,2,3]);
