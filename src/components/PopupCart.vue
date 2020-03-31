<template>

  <div class="text-center">

    <v-dialog width="800" height="400">

      <template v-slot:activator="{ on }">

        <v-btn class="success" dark v-on="on">
          <v-icon>mdi-cart</v-icon> Basket
          
        </v-btn>

      </template>

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
            <v-col xs="1">
              <v-btn text @click.prevent="removePlatFromCart(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            

            </v-col>
          </v-row>
          <v-divider ></v-divider>
          <div v-if="cart.length > 0">
            <span class="font-weight-light caption">Total HT : {{price}}$</span>
            <p class="font-weight-light caption">Frais de livraison : 2.99$</p>
            <v-row justify="space-around">
              <h2 >Total : {{price + 2.99}}$</h2>
              <v-btn color="secondary black--text" @click.prevent="clearCartItems()">Vider le panier</v-btn>
            </v-row>
            
            
            <v-row justify="center">
            <v-btn color="success" class="my-2" @click.prevent="passerCommande(price)">Passer commande</v-btn>
            </v-row>
          </div>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['cart']),
    ...mapGetters({
      price: 'cartTotalPrice'
    })

  },
  methods: {

    ...mapActions({
      removePlatFromCart : "removePlatFromCart",
      clearCartItems: "clearCart",
      getCartItems: "getCartItems",
      passerCommande : "placeOrder"
    }),

  },
  mounted() {
    this.getCartItems()
  }

}
</script>

<style>

</style>