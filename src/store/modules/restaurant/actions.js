import Restaurants from "../../../apis/Restaurants";

export const getRestaurants = ({ commit }) => {
  Restaurants.all().then(response => {
    commit("SET_RESTAURANTS", response.data["hydra:member"]);
  });
};

export const getRestaurantWithOwner = async ({ commit }, id) => {
  await Restaurants.RestaurantWithUser(id).then(response => {
    commit("SET_OWNER_RESTAURANT", response.data["hydra:member"][0]);
  });
};

// export const createRestaurant = restaurant => {
//   console.log(restaurant);
//   Restaurants.store(restaurant);
//   // .then(response => {
//   //   commit("SET_OWNER_RESTAURANT", response.data["hydra:member"][0]);
//   // });
// };
