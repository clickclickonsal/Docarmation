require 'httparty'

class Vehicle < ActiveRecord::Base
	belongs_to :user
	has_many :maintenances
	has_many :maintenance_types, through: :maintenances
	attr_accessor :makes
	validates :vehicle_make, :vehicle_model, :vehicle_model_year, :vehicle_trim, :vehicle_style, presence: true
	

	# def self.makes 
	# 	raw_make = HTTParty.get("https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=ggcncvxvnkej7ff8kk6mpr8k") 
	#   raw_make['makes'].map {|make| p make['name']}
	# end

	# def self.years
	# 	years = (1990..2014).to_a.reverse
	# end
	#future implement in model select feature
	# def models
	# 	HTTParty.get("https://api.edmunds.com/api/vehicle/v2/lexus/models?fmt=json&year=1995&api_key=ggcncvxvnkej7ff8kk6mpr8k")
	# 	model['models'][0]['name']
	# 	model['models'][0]['name']110:0> model['models'].each {|model| p model['name']}
	# end
end

