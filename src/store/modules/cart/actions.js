export const addProductToCart = async (
  { commit, getters, dispatch },
  { product, quantity }
) => {
  // console.log(product);
  // console.log(getters.getCart);
  let productInCart = getters.getCart.find((item) => {
    return item.product["@id"] === product["@id"];
  });

  let MatchRestaurant = getters.getCart.find((item) => {
    return item.product.restaurant.id != product.restaurant.id;
  });

  if (!MatchRestaurant) {
    if (productInCart) {
      productInCart.quantity += quantity;
      commit("INCREASE_QUANTITY", productInCart);
    } else {
      commit("ADD_TO_CART", { product, quantity });
    }
    commit("SAVE_CART");
    dispatch(
      "notifications/addNotification",
      {
        type: "success",
        message: "Product added to cart.",
      },
      { root: true }
    );
  } else {
    dispatch(
      "notifications/addNotification",
      {
        type: "error",
        message: "You can only order products from the same restaurant",
      },
      { root: true }
    );
  }
};

export const removeProductFromCart = async (
  { commit, dispatch },
  panierDetail
) => {
  commit("REMOVE_PRODUCT_FROM_CART", panierDetail.product);

  commit("SAVE_CART");
  dispatch(
    "notifications/addNotification",
    {
      type: "error",
      message: "Product removed from cart.",
    },
    { root: true }
  );
};

export const clearCart = ({ commit, dispatch }) => {
  commit("CLEAR_CART");
  dispatch(
    "notifications/addNotification",
    {
      type: "warning",
      message: "Cleared Cart",
    },
    { root: true }
  );
};

// export const getCartItems = ({ commit }) => {
//   // Panier.all().then((response) => {
//   //   commit("SET_PANIER", response.data);
//   // });
//   // commit("SET_CART");
//   // commit("SET_PANIER", localStorage.getItem("panier"));
// };
