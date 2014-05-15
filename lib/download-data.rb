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
  cache_locally = ENV['CACHE']
  file_location = @base_path.join(name)
  puts "getting '#{name}'"
  if(cache_locally && File.exist?(file_location) )
    puts "    discovered local cache"
    data = File.read(file_location)
  else
    puts "    fetching #{url}"
    data = open(url).read
    if(cache_locally)
      data.force_encoding('UTF-8')
      File.open(file_location, 'w') {|f| f.write(data) }
    end
  end
  data
end

