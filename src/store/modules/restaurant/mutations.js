export const SET_RESTAURANTS = (state, restaurants) => {
  state.restaurants = restaurants;
};

export const SET_OWNER_RESTAURANT = (state, restaurant) => {
  state.OwnerRestaurant = restaurant;
  state.OwnerRestaurantPlats = restaurant.plats;
};
