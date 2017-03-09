SHELL=/bin/bash

all:

land-polygons: submodules download downloads/simplified-land-polygons-complete-3857 downloads/land-polygons-split-3857 downloads/ne_10m_populated_places

.PHONY: osm-bright
osm-bright:
	cp osm-bright-configure.py osm-bright/configure.py
	ln -sf ../downloads osm-bright/shp
	bash -c "cd osm-bright; ./make.py build; cd .."
	mkdir -p tilemill-build
	cp -rf osm-bright/build/* tilemill-build
	rm -f ~/Documents/MapBox/project/OSMBright
	ln -sf ${PWD}/tilemill-build/ ~/Documents/MapBox/project/OSMBright




submodules:
	git submodule init && git submodule update

downloads/simplified-land-polygons-complete-3857: downloads/simplified-land-polygons-complete-3857.zip
	cd downloads && unzip simplified-land-polygons-complete-3857.zip

downloads/land-polygons-split-3857: downloads/land-polygons-split-3857.zip
	cd downloads && unzip land-polygons-split-3857.zip

downloads/ne_10m_populated_places: downloads/ne_10m_populated_places.zip
	mkdir -p downloads/ne_10m_populated_places
	cd downloads/ne_10m_populated_places && unzip ../ne_10m_populated_places.zip

download:
	mkdir -p downloads

downloads/ne_10m_populated_places.zip:
	wget http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_populated_places.zip -O $@
	touch $@

downloads/simplified-land-polygons-complete-3857.zip:
	wget http://data.openstreetmapdata.com/simplified-land-polygons-complete-3857.zip -O $@
	touch $@

downloads/land-polygons-split-3857.zip:
	wget http://data.openstreetmapdata.com/land-polygons-split-3857.zip -O $@
	touch $@


clean:
	rm -rf downloads
