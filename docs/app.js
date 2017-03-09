(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _power_plant = require('./power_plant');

function installMap(domId) {
    var map = L.map(domId).setView([18.2554, -66.3025], 10);

    L.tileLayer('puerto-rico-map-tiles/tiles/{z}/{x}/{y}.png', {
        minZoom: 8,
        bounds: [[9.9905, -83.0676], [26.6082, -54.1076]],
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>'
    }).addTo(map);

    var myIcon = L.icon({
        iconUrl: 'icons/power_plant.png',
        //iconRetinaUrl: 'my-icon@2x.png',
        iconSize: [37, 49],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    });

    L.marker([18.2294, -66.4893], { icon: myIcon }).addTo(map);
}

window.installMap = installMap;


},{"./power_plant":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PowerPlant = exports.PowerPlant = function PowerPlant(lng, lat) {
    _classCallCheck(this, PowerPlant);

    this.lat = lat;
    this.lng = lng;
};


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
