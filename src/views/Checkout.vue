<template>
  <v-container class="secondary">
    <v-card flat class="px-3">
      <h1 v-if="cart.length == 0">Empty Cart</h1>
      <h1 v-else>
        Your Cart
        <v-icon color="black" large>mdi-cart-arrow-down</v-icon>
      </h1>

      <div v-for="item in cart" :key="item.product.id">
        <v-row row wrap align="center" v-if="item.product['@type'] === 'Menu'">
          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header class="pa-0">
                <v-col cols="12" md="4">
                  <div class="caption grey--text">Menu</div>

                  <div class="d-flex">
                    <h4>{{item.product.libelle}}</h4>
                  </div>
                </v-col>

                <v-col xs="2">
                  <div class="caption grey--text">Restaurant</div>

                  <div>{{item.product.restaurant.libelle}}</div>
                </v-col>

                <v-col xs="2">
                  <div class="caption grey--text">Quantity</div>

                  <div>{{item.quantity}}</div>
                </v-col>

                <v-col xs="2">
                  <div class="caption grey--text">Price</div>

                  <div>{{item.product.prix}} $</div>
                </v-col>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row
                  row
                  wrap
                  align="center"
                  v-for="item in item.product.menuDetails"
                  :key="item.plat.id"
                >
                  <v-col cols="12" sm="8" md="6">
                    <div class="caption grey--text">Dish in menu</div>
                    <div class="d-flex align-center">
                      <v-avatar class="mr-5">
                        <v-img
                          :src="item.plat.image ? 'http://localhost:3000/images/products/' + item.plat.image.filePath : 'https://cdn.vuetifyjs.com/images/cards/cooking.png' "
                        ></v-img>
                      </v-avatar>
                      <div>{{item.plat.libelle}}</div>
                    </div>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <div class="caption grey--text">Unit Price</div>

                    <div>{{item.plat.prix}} $</div>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
        <v-row row wrap align="center" v-else>
          <v-col cols="12" md="4">
            <div class="caption grey--text">Dish</div>
            <div class="d-flex align-center">
              <v-avatar class="mr-5">
                <v-img
                  :src="item.product.image ? 'http://localhost:3000/images/products/' + item.product.image.filePath : 'https://cdn.vuetifyjs.com/images/cards/cooking.png' "
                ></v-img>
              </v-avatar>
              <div>{{item.product.libelle}}</div>
            </div>
          </v-col>

          <v-col xs="2">
            <div class="caption grey--text">Restaurant</div>

            <div>{{item.product.restaurant.libelle}}</div>
          </v-col>

          <v-col xs="2">
            <div class="caption grey--text">Quantity</div>

            <div>{{item.quantity}}</div>
          </v-col>

          <v-col xs="2">
            <div class="caption grey--text">Price</div>

            <div>{{item.product.prix}} $</div>
          </v-col>
        </v-row>
      </div>
      <v-divider></v-divider>
      <div v-if="cart.length > 0">
        <span class="font-weight-light caption">Total HT : {{price}}$</span>
        <p class="font-weight-light caption">Delivery fee : 2.5$</p>
        <h2>Total : {{price + 2.5}}$</h2>

        <v-row justify="center">
          <v-btn color="success" class="my-2" @click.prevent="passerCommande({price, cart, user})">
            Place Order
            <v-icon>mdi-map-marker-check</v-icon>
          </v-btn>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      expand: false
    };
  },
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