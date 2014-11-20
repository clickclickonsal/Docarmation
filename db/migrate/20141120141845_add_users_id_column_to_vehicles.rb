class AddUsersIdColumnToVehicles < ActiveRecord::Migration
  def change
    add_column :vehicles, :user_id, :integer, index: true
  end
end
