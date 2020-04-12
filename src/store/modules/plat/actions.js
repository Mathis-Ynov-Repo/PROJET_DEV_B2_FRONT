import Plats from "../../../apis/Plats";

export const getPlats = ({ commit }) => {
  Plats.all().then(response => {
    commit("SET_PLATS", response.data["hydra:member"]);
  });
};

export const getRestaurantPlats = async ({ commit }, id) => {
  await Plats.allPlatsFromRestaurant(id).then(response => {
    commit("SET_RESTAURANT_PLATS", response.data["hydra:member"]);
  });
};
