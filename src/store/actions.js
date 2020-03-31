
import Plats from '../apis/Plats'
import Panier from '../apis/Panier'
import Commande from '../apis/Commande';

export const getPlats = ({ commit }) => {
    Plats.all()
    .then(response => {
        commit('SET_PLATS', response.data);
    })
}

export const addPlatToCart = ({commit}, {plat, quantity}) => {
    commit('ADD_TO_CART', { plat, quantity });

    Panier.getOne(plat.id).then( response => {
        let panier = response.data;
        if(panier) {
            Panier.patch(panier.id, {
                quantity: panier.quantity += 1
            })
        } else {
            Panier.store({
                plat : plat.id,
                panier: 41,
                quantity
            });
        }
    })
    

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
    console.log(price);
    commit('ORDER_PLAT', price );

    Commande.store({
        prix : price,
        statut : 'en cours',
        frais : '2.99'
    })
}