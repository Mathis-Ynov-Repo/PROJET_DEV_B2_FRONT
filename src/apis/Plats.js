import Api from "./Api";

const END_POINT = "plats";

export default {
  all() {
    return Api.get(END_POINT);
  },
  allPlatsFromRestaurant(id) {
    return Api.get(END_POINT + "?restaurant.id=" + id);
  }
};
