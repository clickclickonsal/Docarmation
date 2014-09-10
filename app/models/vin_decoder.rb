require 'httparty'

class VinDecoder
	include ActiveModel::Validations

	attr_accessor :vin
	
	validates :vin, presence: true, length: {is: 17}

	def initialize(vin = nil)
		@vin = vin
	end
	
	def vin_decoder
		vehicle = HTTParty.get("https://api.edmunds.com/api/vehicle/v2/vins/#{vin}?manufactureCode=3548&fmt=json&api_key=ggcncvxvnkej7ff8kk6mpr8k") 
	end
end

