module Api
  module V1
    class RestaurantsController < ApplicationController
      def index
        restaurant = Restaurant.all

        render json: {
          restaurant: restaurant
        }, status: :ok
      end
    end
  end
end