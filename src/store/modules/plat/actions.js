import Plats from "../../../apis/Plats";

export const getPlats = async ({ commit, rootState }) => {
  await Plats.all().then((response) => {
    let plats = response.data["hydra:member"];
    let user = rootState.authentication.user;
    commit("SET_PLATS", plats);

    commit("SET_FAVORITE_ITEMS", { plats, user });
  });
};

export const getRestaurantPlats = async ({ commit }, id) => {
  await Plats.allPlatsFromRestaurant(id).then((response) => {
    commit("SET_RESTAURANT_PLATS", response.data["hydra:member"]);
  });
};

export const deletePlat = async ({ dispatch }, plat) => {
  await Plats.delete(plat.id);
  dispatch(
    "notifications/addNotification",
    {
      type: "error",
      message: "Plat supprimé",
    },
    { root: true }
  );
};

export const editPlat = async ({ dispatch }, plat) => {
  await Plats.edit(plat.id, {
    libelle: plat.libelle,
    prix: plat.prix,
    platType: plat.platType,
    description: plat.description,
  });
  dispatch(
    "notifications/addNotification",
    {
      type: "success",
      message: "Plat mis à jour",
    },
    { root: true }
  );
};

export const updatePlat = ({ dispatch }) => {
  dispatch(
    "notifications/addNotification",
    {
      type: "success",
      message: "Plat updated successfully",
    },
    { root: true }
  );
};

export const removeFavorite = async ({ commit, rootState, state }, item) => {
  commit("REMOVE_ITEM_FROM_FAVORITES", item);
  let IRIArray = [];
  state.favorites.forEach((element) => {
    IRIArray.push(element["@id"]);
  });
  await Plats.editFavorites(rootState.authentication.user.id, {
    plats: IRIArray,
  });
};

export const addFavorite = async ({ commit, rootState, state }, item) => {
  commit("ADD_TO_FAVORITES", item);
  let IRIArray = [];
  state.favorites.forEach((element) => {
    IRIArray.push(element["@id"]);
  });
  await Plats.editFavorites(rootState.authentication.user.id, {
    plats: IRIArray,
  });
};
