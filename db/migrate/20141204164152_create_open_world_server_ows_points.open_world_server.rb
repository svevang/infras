# This migration comes from open_world_server (originally 20141105224835)
class CreateOpenWorldServerOwsPoints < ActiveRecord::Migration
  def change
    create_table :open_world_server_ows_points do |t|
      t.point :point

      t.timestamps
    end
  end
end
