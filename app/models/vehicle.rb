class Vehicle < ActiveRecord::Base
	
	has_many :maintenances
	belongs_to :user
	validates :vehicle_make, :vehicle_model, :vehicle_model_year, :vehicle_trim, :vehicle_style, presence: true
end

