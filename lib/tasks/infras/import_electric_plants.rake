require 'download-data'
require 'import-planta'


namespace :infras do
  desc "Import a list of electric plants"
  task import_electric_plants: :environment do
    file_extensions = ['cst', 'dbf', 'prj', 'shp', 'shx']
    base_url = "https://s3.amazonaws.com/infras/INFRAS_ELECTRICA/INFRAS_ELECTRICA_PLANTAS_GENERATRICES."
    base_name = "INFRAS_ELECTRICA_PLANTAS_GENERATRICES."

    file_extensions.each do |extension|
      download_data_and_read(base_name+extension,
                             base_url+extension)
    end
    PlantaImporter.process(download_path().join(base_name + "shp").to_path)

  end

end
