class VinDecodersController < ApplicationController

	def home
  end

	def new
		@vin = VinDecoder.new
	end

	def search
		@vin = VinDecoder.new(params[:vin])
		if @vin.valid?
			if @vin.vin_decoder["status"] != "NOT_FOUND"
				@vin_info = @vin.vin_decoder
			else
				render "new"
			end
		else
			render "new"
		end
	end

end