import Restaurants from "../../../apis/Restaurants";

export const getRestaurants = ({ commit }) => {
  Restaurants.all().then((response) => {
    commit("SET_RESTAURANTS", response.data["hydra:member"]);
  });
};

// export const getRestaurantWithOwner = async ({ commit }, id) => {
//   await Restaurants.RestaurantWithUser(id).then((response) => {
//     commit("SET_OWNER_RESTAURANT", response.data["hydra:member"][0]);
//   });
// };

export const getRestaurantWithOwner = async ({ commit }) => {
  await Restaurants.RestaurantWithUser().then((response) => {
    commit("SET_OWNER_RESTAURANT", response.data["hydra:member"][0]);
  });
};

export const createRestaurant = async ({ commit }, restaurant) => {
  Restaurants.store(restaurant).then((response) => {
    commit("SET_OWNER_RESTAURANT", response.data);
  });
};
