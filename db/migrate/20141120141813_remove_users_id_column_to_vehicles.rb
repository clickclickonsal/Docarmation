class RemoveUsersIdColumnToVehicles < ActiveRecord::Migration
  def change
    remove_column :vehicles, :user_id
  end
end
