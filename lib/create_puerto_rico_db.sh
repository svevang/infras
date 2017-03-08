#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

git submodule init && git submodule update;

cd $DIR/osm-extract-by-region;
./osm_extract.sh central-america puerto-rico

createdb puerto_rico_osm
echo "create extension postgis" | psql puerto_rico_osm
osm2pgsql  -d puerto_rico_osm extractions/puerto-rico.osm
