class CreateMaintenance < ActiveRecord::Migration
  def change
    create_table :maintenances do |t|
    	t.string :maintenance_type
      t.integer :mileage
      t.string :shop_name
      t.datetime :date

      t.references :vehicle, index: true 
    end
  end
end
