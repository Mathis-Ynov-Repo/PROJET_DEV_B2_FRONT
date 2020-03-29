<template>

  <div class="text-center">

    <v-dialog width="800">

      <template v-slot:activator="{ on }">

        <v-btn class="success" dark v-on="on">
          <v-icon>mdi-cart</v-icon> Basket
          
        </v-btn>

      </template>

      <v-card flat class="px-3">
        <h1 v-if="cart.length == 0">Votre Panier est vide</h1>
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

              <div>10 $</div>

            </v-col>
            <v-col xs="1">
              <v-btn text @click.prevent="removePlatFromCart(item.plat)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            

            </v-col>
          </v-row>
        <h2 v-if="cart.length > 0">Total : {{price}}$</h2>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    price() {
      return this.$store.getters.cartTotalPrice;
    }
  },
  methods: {
    removePlatFromCart(plat) {
      this.$store.dispatch("removePlatFromCart", plat);
    }
  }

}
</script>

<style>

</style>