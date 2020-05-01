<template>
  <div class="text-center">
    <v-dialog width="800" height="400">
      <template v-slot:activator="{ on }">
        <v-btn class="success" dark v-on="on">
          <v-icon>mdi-cart</v-icon>Basket
        </v-btn>
      </template>

      <v-card flat class="px-3">
        <v-container>
          <h1 v-if="cart.length == 0">
            Empty Cart
            <v-icon large color="black">mdi-cart</v-icon>
          </h1>
          <h1 v-else>Your Cart</h1>

          <v-row row wrap align="center" v-for="item in cart" :key="item.product['@id']">
            <v-col cols="12" md="4">
              <div class="caption grey--text">Plat</div>

              <div>{{item.product.libelle}}</div>
            </v-col>

            <v-col xs="2">
              <div class="caption grey--text">Restaurant</div>

              <div>{{item.product.restaurant.libelle}}</div>
            </v-col>

            <v-col xs="2">
              <div class="caption grey--text">Quantité</div>

              <div>{{item.quantity}}</div>
            </v-col>

            <v-col xs="2">
              <div class="caption grey--text">Prix</div>

              <div>{{item.product.prix}} $</div>
            </v-col>
            <v-col xs="1">
              <v-btn text @click.prevent="removeProductFromCart(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <div v-if="cart.length > 0">
            <span class="font-weight-light caption">Total HT : {{price}}$</span>
            <p class="font-weight-light caption">Delivery fee : 2.5$</p>
            <v-row justify="space-around">
              <h2>Total : {{price + 2.5}}$</h2>
              <v-btn color="secondary black--text" @click.prevent="clearCartItems()">Clear Cart</v-btn>
            </v-row>

            <v-row justify="center">
              <v-btn color="success" class="my-2" :to="{ name: 'Checkout' }">Checkout</v-btn>
            </v-row>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("cart", ["cart"]),
    ...mapGetters({
      price: "cart/cartTotalPrice"
    })
  },
  methods: {
    ...mapActions({
      removeProductFromCart: "cart/removeProductFromCart",
      clearCartItems: "cart/clearCart",
      passerCommande: " order/placeOrder"
    })
  }
};
</script>

<style>
</style>