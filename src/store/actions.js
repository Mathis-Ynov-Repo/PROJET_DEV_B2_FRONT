
import Plats from '../apis/Plats';
import Panier from '../apis/Panier';
import Commande from '../apis/Commande';
import Restaurants from '../apis/Restaurants';

export const getPlats = ({ commit }) => {
    Plats.all()
    .then(response => {
        commit('SET_PLATS', response.data);
    })
}

export const getRestaurants = ({ commit }) => {
    Restaurants.all()
    .then(response => {
        commit('SET_RESTAURANTS', response.data);
    })
}

export const addPlatToCart = ({commit, getters}, {plat, quantity}) => {

    let productInCart = getters.getCart.find(item=> {
        return item.plat.id === plat.id;
    });

    if(productInCart) {
        
        productInCart.quantity += quantity
        commit('INCREASE_QUANTITY', productInCart)
        Panier.patchWithPlat(productInCart.plat.id, {
            quantity: productInCart.quantity
        })
    } else {
        commit('ADD_TO_CART', { plat, quantity });
        Panier.store({
            plat : plat.id,
            panier: 41,
            quantity
        });
    }

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
    

}

export const removePlatFromCart = ({commit}, panierDetail) => {
    commit('REMOVE_PLAT_FROM_CART', panierDetail.plat);
    //Panier.delete(panierDetail.id)
    Panier.deleteWithPlat(panierDetail.plat.id)

}

export const clearCart = ({commit}) => {
    commit ('CLEAR_CART');
}

export const getCartItems = ({commit}) => {
    Panier.all()
    .then(response => {
        commit('SET_PANIER', response.data)
    })
}

export const placeOrder = ({ commit }, price) => {
    
    commit('ORDER_PLAT', price );

    Commande.store({
        prix : price,
        statut : 'en cours',
        frais : '2.99'
    }),
    Panier.deleteAll()
}