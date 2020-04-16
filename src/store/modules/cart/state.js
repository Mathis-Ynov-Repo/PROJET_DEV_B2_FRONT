let cart = window.localStorage.getItem("cart");

export default {
  cart: cart ? JSON.parse(cart) : [],
};
