require 'open-uri'
require 'csv'

@base_path = Rails.root.join('tmp/data_import')

def download_path
  @base_path
end

def ensure_directory(path)
  FileUtils::mkdir_p(path)
end

def download_data_and_read(name, url)
  ensure_directory(download_path);
  file_location = @base_path.join(name)
  puts "getting '#{name}'"
  puts "    fetching #{url}"
  data = open(url).read
  data.force_encoding('UTF-8')
  File.open(file_location, 'w') {|f| f.write(data) }
  data
end

