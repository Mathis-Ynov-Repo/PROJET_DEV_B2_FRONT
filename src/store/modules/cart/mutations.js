export const ADD_TO_CART = (state, {plat, quantity}) => {
    
    state.cart.push({
        plat, quantity
    })
}

export const INCREASE_QUANTITY = (state,product) => {
    console.log(state.cart)
    console.log(product.id)
    state.cart = [
       ...state.cart.filter(element => element.plat.id !== product.plat.id),
       product
    ]
    console.log(state.cart)
  }

export const REMOVE_PLAT_FROM_CART = (state, plat) => {
    state.cart = state.cart.filter(item => {
        return item.plat.id != plat.id
    })
}

export const CLEAR_CART = (state) => {
    state.cart = [];

}

export const SET_PANIER = (state, cartItems) => {
    state.cart = cartItems
}