class CreateVehicles < ActiveRecord::Migration
  def change
    create_table :vehicles do |t|
      t.string :vehicle_make
      t.string :vehicle_model
      t.integer :vehicle_model_year
      t.string :vehicle_trim
      t.string :vehicle_style
    end
  end
end
