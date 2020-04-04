
import Restaurants from '../../../apis/Restaurants';


export const getRestaurants = ({ commit }) => {
    Restaurants.all()
    .then(response => {
        commit('SET_RESTAURANTS', response.data);
    })
}