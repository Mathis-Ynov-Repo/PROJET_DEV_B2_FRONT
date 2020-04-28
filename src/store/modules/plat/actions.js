import Plats from "../../../apis/Plats";

export const getPlats = ({ commit }) => {
  Plats.all().then((response) => {
    commit("SET_PLATS", response.data["hydra:member"]);
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
  // commit("SET_OWNER_RESTAURANT", plat);
  dispatch(
    "notifications/addNotification",
    {
      type: "success",
      message: "Plat updated successfully",
    },
    { root: true }
  );
};
