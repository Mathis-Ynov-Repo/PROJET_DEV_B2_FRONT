import Restaurants from "../../../apis/Restaurants";

export const getRestaurants = async ({ commit }) => {
  await Restaurants.all().then((response) => {
    commit("SET_RESTAURANTS", response.data["hydra:member"]);
  });
};

export const getRestaurantsWithType = async ({ commit }, type) => {
  commit("CLEAR_RESTAURANTS");
  await Restaurants.allOfType(type).then((response) => {
    commit("SET_RESTAURANTS", response.data["hydra:member"]);
  });
};

export const clearRestaurants = ({ commit }) => {
  commit("CLEAR_RESTAURANTS");
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

// export const getRestaurant = async (id) => {
//   await Restaurants.get(id);
// };

export const createRestaurant = async ({ commit }, restaurant) => {
  await Restaurants.store(restaurant).then((response) => {
    commit("SET_OWNER_RESTAURANT", response.data);
  });
};

export const updateRestaurant = ({ commit, dispatch }, restaurant) => {
  commit("SET_OWNER_RESTAURANT", restaurant);
  dispatch(
    "notifications/addNotification",
    {
      type: "success",
      message: "Profile updated successfully",
    },
    { root: true }
  );
};

export const updateRestaurantAdmin = ({ dispatch }, restaurant) => {
  dispatch(
    "notifications/addNotification",
    {
      type: "success",
      message: restaurant.libelle + "'s profile has been updated successfully",
    },
    { root: true }
  );
};
