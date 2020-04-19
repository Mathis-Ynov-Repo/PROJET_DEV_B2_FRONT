<template>
  <v-col cols="12" md="6" lg="4" xl="3">
    <v-card class="mx-auto my-12" max-width="374">
      <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
      <v-card-title>{{plat.libelle}}</v-card-title>
      <!-- <v-card-subtitle>{{plat.restaurant.libelle}}</v-card-subtitle> -->
      <v-card-title class="grey--text py-0">{{plat.prix}} $ • {{plat.platType.libelle}}</v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="warning" @click="editDish(plat)">
          <v-icon>mdi-pencil</v-icon>Edit
        </v-btn>

        <v-btn color="error" @click="deleteDish(plat)">
          <v-icon>mdi-delete</v-icon>Delete
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px">
      <v-form v-model="valid">
        <v-card>
          <v-card-title>
            <span class="headline">Mettre à jour votre plat</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="updatedItem.libelle"
              :rules="[v => !!v || 'Un libelle est requis']"
              label="Libelle du plat"
              required
            ></v-text-field>
            <v-text-field
              prefix="$"
              v-model="updatedItem.prix"
              :rules="priceRules"
              label="Prix"
              required
            ></v-text-field>

            <v-select
              v-model="updatedItem.platType"
              :items="this.types"
              item-text="libelle"
              item-value="@id"
              :rules="[v => !!v || 'Ce champ est requis']"
              label="Type de votre plat"
              required
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text color="primary" :disabled="!valid" @click="save(updatedItem)">Sauvegarder</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loading: true,
      dialog: false,
      updatedItem: {},
      valid: true,
      priceRules: [
        v => !!v || "Un prix est requise",
        v => !isNaN(v) || "Veuillez entrer une valeur numérique"
      ],
      platTitle: ""
    };
  },
  methods: {
    async deleteDish(plat) {
      if (confirm("Supprimer ce plat ?")) {
        await this.deletePlat(plat);
      }
      await this.getRestaurant();
    },
    async editDish(plat) {
      this.dialog = true;
      console.log(plat);
      this.updatedItem = Object.assign({}, plat);
      console.log(this.updatedItem);
    },
    async save(plat) {
      console.log(plat);
      plat.prix = parseFloat(plat.prix);
      await this.editPlat(plat);
      this.dialog = false;
      await this.getRestaurant();
    },
    ...mapActions({
      getRestaurant: "restaurant/getRestaurantWithOwner",
      editPlat: "plat/editPlat",
      deletePlat: "plat/deletePlat"
    })
  },
  props: ["plat", "types"]
};
</script>

<style>
</style>