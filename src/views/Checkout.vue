<template>
  <v-container>
    <v-card flat class="px-3">
      <h1 v-if="cart.length == 0">Empty Cart</h1>
      <h1 v-else>Your Cart</h1>

      <v-row row wrap align="center" v-for="item in cart" :key="item.plat.id">
        <v-col cols="12" md="4">
          <div class="caption grey--text">Dish</div>

          <div>{{item.plat.libelle}}</div>
        </v-col>

        <v-col xs="2">
          <div class="caption grey--text">Restaurant</div>

          <div>{{item.plat.restaurant.libelle}}</div>
        </v-col>

        <v-col xs="2">
          <div class="caption grey--text">Quantity</div>

          <div>{{item.quantity}}</div>
        </v-col>

        <v-col xs="2">
          <div class="caption grey--text">Price</div>

          <div>{{item.plat.prix}} $</div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div v-if="cart.length > 0">
        <span class="font-weight-light caption">Total HT : {{price}}$</span>
        <p class="font-weight-light caption">Delivery fee : 2.5$</p>
        <h2>Total : {{price + 2.5}}$</h2>

        <v-row justify="center">
          <v-btn
            color="success"
            class="my-2"
            @click.prevent="passerCommande({price, cart, user})"
          >Place Order</v-btn>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("cart", ["cart"]),
    ...mapState("authentication", ["user"]),
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