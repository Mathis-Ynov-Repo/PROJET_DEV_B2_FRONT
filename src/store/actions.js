import axios from "axios"

export const getPlats = ({ commit }) => {
    axios.get('http://localhost:8001/api/plats')
    .then(response => {
        commit('SET_PLATS', response.data);
    })
}

export const addPlatToCart = ({commit}, {plat, quantity}) => {
    commit('ADD_TO_CART', { plat, quantity });
}

export const removePlatFromCart = ({commit}, plat) => {
    commit('REMOVE_PLAT_FROM_CART', plat);
}