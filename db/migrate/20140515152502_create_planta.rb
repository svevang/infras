class CreatePlanta < ActiveRecord::Migration
  def change
    create_table :planta do |t|
      t.string :aee_nproy
      t.string :globalid
      t.point :location

      t.timestamps
    end
    add_index :planta, :aee_nproy, unique: true
    add_index :planta, :globalid, unique: true
    add_index :planta, :location, unique: false
  end
end
