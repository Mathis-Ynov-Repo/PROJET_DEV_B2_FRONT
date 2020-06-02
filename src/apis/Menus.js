import Api from "./Api";

const END_POINT = "menus";
const DETAILS_END_POINT = "menu_details";

export default {
  all() {
    return Api.get(END_POINT + "?pagination=false");
  },
  allMenusFromRestaurant(id) {
    return Api.get(END_POINT + "&restaurant.id=" + id);
  },
  delete(id) {
    return Api.delete(END_POINT + "/" + id);
  },
  edit(id, data) {
    return Api.put(END_POINT + "/" + id, data);
  },
  editDetails(id, data) {
    return Api.put(DETAILS_END_POINT + "/" + id, data);
  },
};
