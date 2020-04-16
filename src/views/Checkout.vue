<template>
  <v-card flat class="px-3">
    <h1 v-if="cart.length == 0">Panier vide</h1>
    <h1 v-else>Votre Panier</h1>

    <v-row row wrap align="center" v-for="item in cart" :key="item.plat.id">
      <v-col cols="12" md="4">
        <div class="caption grey--text">Plat</div>

        <div>{{item.plat.libelle}}</div>
      </v-col>

      <v-col xs="2">
        <div class="caption grey--text">Restaurant</div>

        <div>{{item.plat.restaurant.libelle}}</div>
      </v-col>

      <v-col xs="2">
        <div class="caption grey--text">Quantité</div>

        <div>{{item.quantity}}</div>
      </v-col>

      <v-col xs="2">
        <div class="caption grey--text">Prix</div>

        <div>{{item.plat.prix}} $</div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <div v-if="cart.length > 0">
      <span class="font-weight-light caption">Total HT : {{price}}$</span>
      <p class="font-weight-light caption">Frais de livraison : 2.99$</p>
      <h2>Total : {{price + 2.99}}$</h2>

      <v-row justify="center">
        <v-btn
          color="success"
          class="my-2"
          @click.prevent="passerCommande({price, cart, user})"
        >Passer commande</v-btn>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("cart", ["cart"]),
    ...mapGetters({
      price: "cart/cartTotalPrice",
      user: "authentication/authUser"
    })
  },
  methods: {
    ...mapActions({
      passerCommande: "order/placeOrder"
    })
  }
};
</script>

<style>
</style>