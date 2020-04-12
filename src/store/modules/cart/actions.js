import Panier from "../../../apis/Panier";

export const addPlatToCart = async (
  { commit, getters, dispatch },
  { plat, quantity }
) => {
  let productInCart = getters.getCart.find(item => {
    return item.plat.id === plat.id;
  });

  if (productInCart) {
    productInCart.quantity += quantity;
    commit("INCREASE_QUANTITY", productInCart);
    await Panier.patchWithPlat(productInCart.plat.id, {
      quantity: productInCart.quantity
    });
  } else {
    commit("ADD_TO_CART", { plat, quantity });
    await Panier.store({
      plat: plat.id,
      panier: 41,
      quantity
    });
  }
  dispatch(
    "notifications/addNotification",
    {
      type: "success",
      message: "Product added to cart."
    },
    { root: true }
  );

  //commit('ADD_TO_CART', { plat, quantity });

  // return Panier.getOne(plat.id).then( response => {
  //     let panier = response.data;
  //     if(panier) {
  //         Panier.patch(panier.id, {
  //             quantity: panier.quantity += 1
  //         })
  //     } else {

  //     }
  // })
};

export const removePlatFromCart = async (
  { commit, dispatch },
  panierDetail
) => {
  commit("REMOVE_PLAT_FROM_CART", panierDetail.plat);

  //Panier.delete(panierDetail.id)
  await Panier.deleteWithPlat(panierDetail.plat.id);

  dispatch(
    "notifications/addNotification",
    {
      type: "error",
      message: "Product removed from cart."
    },
    { root: true }
  );
};

export const clearCart = ({ commit }) => {
  commit("CLEAR_CART");
};

export const getCartItems = ({ commit }) => {
  Panier.all().then(response => {
    commit("SET_PANIER", response.data);
  });
};