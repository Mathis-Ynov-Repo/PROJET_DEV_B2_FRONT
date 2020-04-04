
import Panier from '../../../apis/Panier';
import Commande from '../../../apis/Commande';
import CommandeDetails from '../../../apis/CommandeDetails';




export const placeOrder = ({ commit }, {price, cart}) => {
    
    commit('ORDER_PLAT', price );
    commit('cart/CLEAR_CART', null, { root: true })

    Commande.store({
        prix : price,
        statut : 'en cours',
        frais : '2.99'
    }).then(response => {
        let commande = response.data;
        console.log(cart)
        let commandeArray = [];
        cart.forEach(cartLine => {
            console.log(cartLine)
            if (cartLine.menu){
                let commandeDetail = {
                    'menu': cartLine.menu.id,
                    'commande': commande.id,
                    'prix': cartLine.menu.prix
                }
                commandeArray.push(commandeDetail)
            } else {
                let commandeDetail = {
                    'plat': cartLine.plat.id,
                    'commande': commande.id,
                    'prix': cartLine.plat.prix
                    
                }
                commandeArray.push(commandeDetail)
            }


            
        });
        CommandeDetails.store(
            commandeArray
        )
    })
    Panier.deleteAll()
}