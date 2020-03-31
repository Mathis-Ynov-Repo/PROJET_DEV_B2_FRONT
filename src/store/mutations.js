

export const SET_PLATS = (state, plats) => {
    state.plats = plats
}

export const ADD_TO_CART = (state, {plat, quantity}) => {
    
    let productInCart = state.cart.find(item=> {
        return item.plat.id === plat.id;
    });

    if(productInCart) {
        productInCart.quantity += quantity;
        return;
    }
    
    state.cart.push({
        plat, quantity
    })
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