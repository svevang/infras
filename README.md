# infras: http://svevang.github.io/infras/

The goal of Infras (short for Infrastructura) is to explore the
industrial systems in Puerto Rico.

Puerto Rico is an island with incredible bio-diversity and natural
beauty. It is also dependent on energy production and large
scale industrial systems. Infras is a map of those systems.

### Quickstart

Make sure you have deps installed:

* Osmosis (java): `brew install osmosis`
* Postgresql and PostGIS

then, freshen up the git sub modules:

```
$ git submodule init && git submodule update
```

Lastly, extract and create the DB:

```
$ cd lib && ./create_puerto_rico_db.sh
```

At this point there should be a postgis enabled database. Next, build a
copy of OSM-Bright:

```
$ cd lib && make osm-bright
```

Now you can fire up your copy of TileMill to start generating tiles.

* * *

# Background

### Slippy Map

I wanted to keep the underlying map as general as possible, so I
generated the tiles for this map using
[TileMill](https://github.com/tilemill-project/tilemill).  MapBox is no
longet maintaining TileMill as an OSS project and has given the reins
back to the open mapping community. However, the quality of the project is
still very high and I was quickly able to set up a system to

1) Extract Open Street Map data of Puerto Rico
2) Load that data into a PostGis enabled database
3) Configure an instance of the OSM-Bright TileMill project to use that
data

Next, export mbtiles for Puerto Rico using TileMill.  Mbtiles are a
special format that can be converted into a more traditional folder
structure using the excellent `mb-util` tool.

The result can be seen over in
[svevang/puerto-rico-map-tiles](https://github.com/svevang/puerto-rico-map-tiles)


### GIS Data

The GIS data is from the [Gobierno de Puerto
Rico](http://www2.pr.gov/agencias/gis/descargaGeodatos/Infraestructuras/Pages/Electricidad.aspx).  I downloaded a shape
file and converted it to geojson. Something like:

```
ogr2ogr -f GeoJSON -t_srs crs:84 <output.json> <input.shp>
```

### Pixel Art

This is my first attempt at pixel art!

![alt text](http://svevang.github.io/infras/icons/power_plant.png "Power Plant")

I used the GIMP to make it. It was really helpful to watch some videos
on making pixel art, especially this one: [GIMP Pixel Art Tool Setup
Tutorial](https://www.youtube.com/watch?v=PONe4IIYSnQ)



