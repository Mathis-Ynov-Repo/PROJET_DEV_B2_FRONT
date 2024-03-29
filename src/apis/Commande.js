import Api from "./Api";

const END_POINT = "commandes";

export default {
  all() {
    return Api.get(END_POINT);
  },
  store(data) {
    return Api.post(END_POINT, data);
  },
  validate(id) {
    return Api.put(END_POINT + "/" + id, {
      statut: "reçue",
    });
  },
};
