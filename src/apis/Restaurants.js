import Api from "./Api";

const END_POINT = "restaurants?pagniation=false";

export default {
  all() {
    return Api.get(END_POINT);
  },
  allOfType(type) {
    return Api.get(END_POINT + "&type.type=" + type);
  },
  store(data) {
    return Api.post(END_POINT, data);
  },
  patch(id, data) {
    return Api.patch(END_POINT + "/" + id, data);
  },
  delete(id) {
    return Api.delete(END_POINT + "/" + id);
  },
  get(id) {
    return Api.get(END_POINT + "/" + id);
  },
  // RestaurantWithUser(id) {
  //   return Api.get(END_POINT + "?user.id=" + id);
  // }
  RestaurantWithUser() {
    return Api.get(END_POINT);
  },
};
