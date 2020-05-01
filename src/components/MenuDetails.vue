<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn class="success" dark v-on="on">
          check menu out
          <v-icon>mdi-silverware-fork-knife</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>{{menu.libelle}}</v-card-title>
        <v-container>
          <v-row v-for="detail in menu.menuDetails" :key="detail.plat.id" align="center">
            <v-col xl="12">
              <v-img
                max-width="500"
                max-height="200"
                aspect-ratio="1"
                :src="detail.plat.image ? 'http://localhost:3000/images/products/' + detail.plat.image.filePath : 'https://source.unsplash.com/random' "
              ></v-img>
            </v-col>
            <v-col xl="12" class="text-center">{{detail.plat.libelle}} ({{detail.plat.prix}}$)</v-col>
          </v-row>
        </v-container>

        <v-card-text>
          <div class="subtitle-1">{{menu.prix}} $</div>
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
          <v-btn outlined color="primary" @click="close()">close</v-btn>

          <v-btn color="primary" @click="addToCart()">
            Add to Cart
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
  props: ["menu"],
  data() {
    return {
      quantity: 1,
      dialog: false
    };
  },
  methods: {
    ...mapActions("cart", ["addProductToCart"]),
    async addToCart() {
      await this.addProductToCart({
        product: this.menu,
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