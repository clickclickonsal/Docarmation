class CreateMaintenance < ActiveRecord::Migration
  def change
    create_table :maintenances do |t|
      t.integer :mileage
      t.string :shop_name
      t.datetime :date

      t.references :maintenance_type, index: true 
      t.references :vehicle, index: true 
    end
  end
end
