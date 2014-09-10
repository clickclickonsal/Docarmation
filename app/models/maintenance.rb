class Maintenance < ActiveRecord::Base
	belongs_to :vehicle
	belongs_to :maintenance_type
end