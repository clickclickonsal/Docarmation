class CreateMaintenanceTypes < ActiveRecord::Migration
  def change
    create_table :maintenance_types do |t|
    	t.string :name
    end
  end
end
