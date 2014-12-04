class RemoveLocationFromPlanta < ActiveRecord::Migration
  def change
    remove_column :planta, :location, :point
    add_reference :planta, :ows_point, null: false, index: true
  end
end
