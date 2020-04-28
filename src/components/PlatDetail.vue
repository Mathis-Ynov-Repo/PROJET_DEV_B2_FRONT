<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn class="success" dark v-on="on">
          Voir le produit
          <v-icon>mdi-silverware-fork-knife</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-img
          height="300"
          :src="plat.image ? 'http://localhost:3000/images/products/' + plat.image.filePath : 'https://cdn.vuetifyjs.com/images/cards/cooking.png' "
        ></v-img>

        <v-card-title>{{plat.libelle}}</v-card-title>

        <v-card-text>
          <div class="my-4 subtitle-1">{{plat.prix}} $</div>
        </v-card-text>

        <v-subheader>Quantity</v-subheader>
        <v-slider
          v-model.number="quantity"
          step="1"
          :min="1"
          :max="10"
          class="px-12"
          thumb-label
          type="number"
        />
        <v-card-actions class="justify-space-around">
          <v-btn outlined color="primary" @click="close()">Fermer</v-btn>

          <v-btn color="primary" @click="addToCart()">
            Ajouter au panier
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["plat"],
  data() {
    return {
      quantity: 1,
      dialog: false
    };
  },

  methods: {
    ...mapActions("cart", ["addPlatToCart"]),
    async addToCart() {
      await this.addPlatToCart({
        plat: this.plat,
        quantity: this.quantity
      }),
        this.close();
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>