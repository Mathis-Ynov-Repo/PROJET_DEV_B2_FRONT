export const ADD_TO_CART = (state, { product, quantity }) => {
  state.cart.push({
    product,
    quantity,
  });
};

export const INCREASE_QUANTITY = (state, product) => {
  state.cart = [
    ...state.cart.filter(
      (element) => element.product["@id"] !== product.product["@id"]
    ),
    product,
  ];
};

export const REMOVE_PRODUCT_FROM_CART = (state, product) => {
  state.cart = state.cart.filter((item) => {
    return item.product["@id"] != product["@id"];
  });
};

export const CLEAR_CART = (state) => {
  state.cart = [];
  window.localStorage.removeItem("cart");
};

export const SAVE_CART = (state) => {
  window.localStorage.setItem("cart", JSON.stringify(state.cart));
};
