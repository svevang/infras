require 'rgeo/shapefile'
require 'rgeo/geo_json'
require 'pry'
require 'json'

class PlantaImporter
  def self.process(path)

    epgs_32161_proj4 = "+proj=lcc +lat_1=18.43333333333333 +lat_2=18.03333333333333 +lat_0=17.83333333333333 +lon_0=-66.43333333333334 +x_0=200000 +y_0=200000 +ellps=GRS80 +datum=NAD83 +units=m +no_defs"
    epgs_32161_ogcwkt = <<WKT
PROJCS["NAD83 / Puerto Rico & Virgin Is.",GEOGCS["NAD83",DATUM["North_American_Datum_1983",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],AUTHORITY["EPSG","6269"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4269"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["standard_parallel_1",18.43333333333333],PARAMETER["standard_parallel_2",18.03333333333333],PARAMETER["latitude_of_origin",17.83333333333333],PARAMETER["central_meridian",-66.43333333333334],PARAMETER["false_easting",200000],PARAMETER["false_northing",200000],AUTHORITY["EPSG","32161"],AXIS["X",EAST],AXIS["Y",NORTH]]
WKT

    wgs84_proj4 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'
    wgs84_wkt = <<WKT
  GEOGCS["WGS 84",
             DATUM["WGS_1984",
                         SPHEROID["WGS 84",6378137,298.257223563,
                                          AUTHORITY["EPSG","7030"]],
                               AUTHORITY["EPSG","6326"]],
                 PRIMEM["Greenwich",0,
                              AUTHORITY["EPSG","8901"]],
                     UNIT["degree",0.01745329251994328,
                                AUTHORITY["EPSG","9122"]],
                         AUTHORITY["EPSG","4326"]]
WKT

    wgs84_factory = RGeo::Geographic.spherical_factory(:srid => 4326,
                                                       :proj4 => wgs84_proj4, :coord_sys => wgs84_wkt)

    epgs_32161_factory = RGeo::Cartesian.factory(:srid => 32161,
                                                 :proj4 => epgs_32161_proj4, 
                                                 :coord_sys => epgs_32161_ogcwkt)

    ewkt_generator = RGeo::WKRep::WKTGenerator.new({tag_format: :ewkt, emit_ewkt_srid: true})

    count = 0
    error_count = 0
    RGeo::Shapefile::Reader.open(path) do |file|
      puts "File contains #{file.num_records} records."
      features = []
      file.each do |record|
        puts "Record number #{record.index}:"

        local_record = epgs_32161_factory.parse_wkt(record.geometry.as_text)

        projected_point = RGeo::Feature.cast(local_record, 
                                             :factory => wgs84_factory, :project => true);
        attributes = Hash.new(record.attributes)
        attributes["epgs_32161"] = { latitude: local_record.y, longitude: local_record.x}
        attributes["wgs84"] = { latitude: projected_point.latitude, longitude: projected_point.longitude}
        attributes["ewkt"] = ewkt_generator.generate(local_record)

        aee_ids = attributes['AEE_NPROY']

        Planta.where(aee_nproy: record.attributes["AEE_NPROY"]).each do |planta|
          planta.destroy
        end

        json_point = ows_point = RGeo::GeoJSON.encode(projected_point)
        ows_point = OpenWorldServer::OwsPoint.where(point: projected_point.as_text).first_or_create(point: json_point)
        model_attributes = {aee_nproy: aee_ids['AEE_NPROY'],
                            globalid: aee_ids['GlobalID'],
                            ows_point: ows_point}

        planta = Planta.create(model_attributes)
        if planta.persisted?
          count += 1
        else
          error_count += 1
        end
        features.push(planta)

      end
    end
    puts "create #{count} plantas, with #{error_count} errors"

  end
end

