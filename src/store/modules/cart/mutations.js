// let cart = window.localStorage.getItem("cart");

export const ADD_TO_CART = (state, { plat, quantity }) => {
  state.cart.push({
    plat,
    quantity,
  });
};

export const INCREASE_QUANTITY = (state, product) => {
  state.cart = [
    ...state.cart.filter((element) => element.plat.id !== product.plat.id),
    product,
  ];
};

export const REMOVE_PLAT_FROM_CART = (state, plat) => {
  state.cart = state.cart.filter((item) => {
    return item.plat.id != plat.id;
  });
};

export const CLEAR_CART = (state) => {
  state.cart = [];
  window.localStorage.removeItem("cart");
};

export const SAVE_CART = (state) => {
  window.localStorage.setItem("cart", JSON.stringify(state.cart));
};

// export const SET_PANIER = (state, cartItems) => {
//   state.cart = cartItems;
// };

// export const SET_CART = (state) => {
//   state.cart = cart
// };
