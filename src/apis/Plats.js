import Api from "./Api";

const END_POINT = "plats";
const FAVORITES_END_POINT = "users";

export default {
  all() {
    return Api.get(END_POINT + "?pagination=false");
  },
  allPlatsFromRestaurant(id) {
    return Api.get(END_POINT + "?pagination=false&restaurant.id=" + id);
  },
  delete(id) {
    return Api.delete(END_POINT + "/" + id);
  },
  edit(id, data) {
    return Api.put(END_POINT + "/" + id, data);
  },
  editFavorites(id, data) {
    return Api.put(FAVORITES_END_POINT + "/" + id, data);
  },
};
