import Panier from "../../../apis/Panier";
import Commande from "../../../apis/Commande";
import CommandeDetails from "../../../apis/CommandeDetails";

export const placeOrder = async (
  { commit, dispatch },
  { price, cart, user }
) => {
  commit("ORDER_PLAT", price);
  commit("cart/CLEAR_CART", null, { root: true });

  await Commande.store({
    prix: price,
    statut: "en cours",
    frais: 2.99,
    user: "/api/users/" + user.id
  }).then(async response => {
    let commande = response.data;
    console.log(cart);
    let commandeArray = [];
    cart.forEach(cartLine => {
      console.log(cartLine);
      if (cartLine.menu) {
        let commandeDetail = {
          menu: cartLine.menu.id,
          commande: commande.id,
          prix: cartLine.menu.prix
        };
        commandeArray.push(commandeDetail);
      } else {
        let commandeDetail = {
          plat: cartLine.plat.id,
          commande: commande.id,
          prix: cartLine.plat.prix
        };
        commandeArray.push(commandeDetail);
      }
    });
    await CommandeDetails.store(commandeArray);
    dispatch(
      "notifications/addNotification",
      {
        type: "success",
        message: "Commande passée"
      },
      { root: true }
    );
  });
  Panier.deleteAll();
};
