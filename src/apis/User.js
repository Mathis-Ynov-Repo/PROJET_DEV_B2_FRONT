import Api from "./Api";

const END_POINT = "users";

export default {
  all() {
    return Api.get(END_POINT);
  },
  store(data) {
    return Api.post(END_POINT, data);
  },
  update(id, balance) {
    return Api.put(END_POINT + "/" + id, {
      balance: balance,
    });
  },
};
