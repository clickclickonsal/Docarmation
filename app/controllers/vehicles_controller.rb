class VehiclesController < ApplicationController
  before_action :authenticate_user!

  def index
    @vehicles = Vehicle.where(user_id: current_user.id)
  end

  def show
    @vehicle = Vehicle.find( params[:id] )
  end

  def new
    @vehicle = Vehicle.new
    @makes = Vehicle.makes
    @years = Vehicle.years
    # @models = Vehicle.models
  end

  def create
    @vehicle = Vehicle.new(vehicle_params.merge(user_id: current_user.id))
    if @vehicle.save
      redirect_to @vehicle
    else
      render "new"
    end
  end


  def destroy
    @vehicle = Vehicle.find(params[:id])
    @vehicle.destroy
     redirect_to vehicles_path
  end

  private
  def vehicle_params
    params.require(:vehicle).permit(:vehicle_make, :vehicle_model, :vehicle_model_year, :vehicle_trim, :vehicle_style)
  end

end

