import Commande from "../../../apis/Commande";
import CommandeDetails from "../../../apis/CommandeDetails";
import User from "../../../apis/User";

export const placeOrder = async (
  { commit, dispatch },
  { price, cart, user }
) => {
  if (user.balance >= price) {
    commit("ORDER_PLAT", price);
    commit("authentication/LOWER_BALANCE", price, { root: true });
    commit("cart/CLEAR_CART", null, { root: true });

    await User.update(user.id, user.balance);
    localStorage.setItem("user", JSON.stringify(user));
    await Commande.store({
      prix: price,
      statut: "en cours",
      frais: 2.99,
      restaurant:
        "api/restaurants/" + cart[0].plat.restaurant.id ||
        cart[0].menu.restaurant.id,
    }).then(async (response) => {
      let commande = response.data;
      let commandeArray = [];
      cart.forEach((cartLine) => {
        if (cartLine.menu) {
          let commandeDetail = {
            menu: cartLine.menu.id,
            commande: commande.id,
            prix: cartLine.menu.prix,
          };
          commandeArray.push(commandeDetail);
        } else {
          let commandeDetail = {
            plat: cartLine.plat.id,
            commande: commande.id,
            prix: cartLine.plat.prix,
          };
          commandeArray.push(commandeDetail);
        }
      });
      await CommandeDetails.store(commandeArray);
      dispatch(
        "notifications/addNotification",
        {
          type: "success",
          message: "Commande passée",
        },
        { root: true }
      );
    });
  } else {
    dispatch(
      "notifications/addNotification",
      {
        type: "error",
        message: "Le prix de cette commande est supérieur à votre solde",
      },
      { root: true }
    );
  }
};
