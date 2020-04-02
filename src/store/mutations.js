

export const SET_PLATS = (state, plats) => {
    state.plats = plats
}

export const ADD_TO_CART = (state, {plat, quantity}) => {
    
    state.cart.push({
        plat, quantity
    })
}

export const INCREASE_QUANTITY = (state,product) => {
    state.cart = [
       ...state.cart.filter(element => element.id !== product.id),
       product
    ]
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

export const ORDER_PLAT = (state, price) => {
    state.order.push({
        price
    })
}