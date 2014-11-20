require 'httparty'

class Vehicle < ActiveRecord::Base
	belongs_to :user
	has_many :maintenances
	has_many :maintenance_types, through: :maintenances
	attr_accessor :makes
	validates :vehicle_make, :vehicle_model, :vehicle_model_year, :vehicle_trim, :vehicle_style, presence: true
end

