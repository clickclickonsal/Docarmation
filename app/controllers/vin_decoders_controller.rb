class VinDecodersController < ApplicationController

	def new
		@vin = VinDecoder.new
	end

	def search
		@vin = VinDecoder.new(params[:vin])
		if @vin.valid?
			@vin_info = @vin.vin_decoder
		else
			render "new"
		end
	end

end