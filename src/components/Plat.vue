<template>
    <v-col
      cols="12"
      md="6"
      lg="4"
      xl="3"
      >
        <v-card
        class="mx-auto my-12"
        max-width="374"
        >
          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>

          <v-card-title>{{plat.libelle}}</v-card-title>

          <v-card-text>

            <div class="my-4 subtitle-1">
              {{plat.prix}} $ • {{plat.platType.libelle}}
            </div>

            <div>{{plat.restaurant.libelle}}</div>
          </v-card-text>


          <v-slider
            v-model.number="quantity"
            step="1"
            :min="1"
            :max="10"
            thumb-label
            type="number"
          />
          <v-card-actions class="justify-center">
            <v-btn class="primary"
              @click="addToCart()"
            >
              Ajouter au panier
            </v-btn>
          </v-card-actions>
      </v-card>
      </v-col>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: ["plat"],
    data() {
      return {
        quantity: 1
      }
      
    },

methods: {

  ...mapActions(['addPlatToCart']),
  addToCart() {
    this.addPlatToCart({
        plat: this.plat,
        quantity: this.quantity
      })
    }
}
}
</script>

<style>

</style>