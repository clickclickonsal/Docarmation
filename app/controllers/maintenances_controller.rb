class MaintenancesController < ApplicationController

	def index
		@maints = Maintenance.all
	end

	def new
		@maint = Maintenance.new
	end

	def show
		@maint = Maintenance.find ( params[:id])
	end

	def create
    @maint = Maintenance.new(maint_params.merge(:vehicle_id => params[:vehicle_id]))
    @vehicle = Vehicle.find( params[:vehicle_id])
    if @maint.save
      redirect_to vehicle_path(@vehicle)
    end
  end

  def destroy
    @maint = Maintenance.find(params[:id])
    @maint.destroy
    @vehicle = Vehicle.find(params[:vehicle_id])
     redirect_to vehicle_path(@vehicle)
  end

  private
  def maint_params
    params.require(:maintenance).permit(:maintenance_type_id, :mileage, :shop_name, :date)
  end

end