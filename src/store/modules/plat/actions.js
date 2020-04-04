import Plats from '../../../apis/Plats';
import Restaurants from '../../../apis/Restaurants';

export const getPlats = ({ commit }) => {
    Plats.all()
    .then(response => {
        commit('SET_PLATS', response.data);
    })
}

export const getRestaurantPlats = async ({ commit }, id) => {
    await Restaurants.allPlatsFromRestaurant(id)
    .then(response => {
        commit('SET_RESTAURANT_PLATS', response.data);
    })
}