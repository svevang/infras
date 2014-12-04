class Planta < ActiveRecord::Base


  belongs_to :ows_point, class_name:'OpenWorldServer::OwsPoint'
  accepts_nested_attributes_for :ows_point

end
