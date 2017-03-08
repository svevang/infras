#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

make land-polygons

cd $DIR/osm-extract-by-region;

echo  " * Extracting osm region for puerto rico:"
./osm_extract.sh central-america puerto-rico

psql -l | grep puerto_rico_osm > /dev/null

if [ $? -ne 0 ];
then
  echo  "* Creating database 'puerto_rico_osm'"
  createdb puerto_rico_osm
  echo "create extension postgis" | psql puerto_rico_osm
  osm2pgsql  -d puerto_rico_osm extractions/puerto-rico.osm
else
  echo "* DB puerto_rico_osm already exists! skipping creation"
fi

