import Api from "./Api";

const END_POINT = "plats";

export default {
  all() {
    return Api.get(END_POINT);
  },
  allPlatsFromRestaurant(id) {
    return Api.get(END_POINT + "?restaurant.id=" + id);
  },
  delete(id) {
    return Api.delete(END_POINT + "/" + id);
  },
  edit(id, data) {
    return Api.put(END_POINT + "/" + id, data);
  },
};
