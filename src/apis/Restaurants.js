import Api from "./Api";

const END_POINT = "restaurants";

export default {
  all() {
    return Api.get(END_POINT);
  },
  store(data) {
    return Api.post(END_POINT, data);
  },
  patch(id, data) {
    return Api.patch(END_POINT + "/" + id, data);
  },
  delete(id) {
    return Api.delete(END_POINT + "/" + id);
  }
};
