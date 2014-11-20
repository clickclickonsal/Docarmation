class ChangeVehicleModelYearColumnType < ActiveRecord::Migration
  def change
    change_column :vehicles, :vehicle_model_year, :string
  end
end
