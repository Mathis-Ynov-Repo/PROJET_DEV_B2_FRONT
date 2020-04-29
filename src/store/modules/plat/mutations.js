export const SET_PLATS = (state, plats) => {
  state.plats = plats;
};

export const SET_RESTAURANT_PLATS = (state, plats) => {
  state.platsFromRestaurant = plats;
};

export const SET_FAVORITE_ITEMS = (state, { plats, user }) => {
  state.favorites = plats.filter((plat) => {
    return plat.likes.includes("/api/users/" + user.id);
  });
};
export const REMOVE_ITEM_FROM_FAVORITES = (state, item) => {
  state.favorites = state.favorites.filter((plat) => {
    return plat.id != item.id;
  });
};

export const ADD_TO_FAVORITES = (state, item) => {
  state.favorites.push(item);
};
