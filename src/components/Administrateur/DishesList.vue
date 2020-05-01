<template>
  <section id="admin_plats_list" class="secondary">
    <v-container class="secondary">
      <v-row class="mb-6 flex-row" no-gutters>
        <Plat :types="types" v-for="plat in restaurant.plats" :key="plat.id" :plat="plat" />
      </v-row>
    </v-container>
    <v-card-text class="white" style="height: 100px; position: relative">
      <v-btn color="primary" dark absolute top right fab @click="dialog = !dialog">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-text>
    <v-dialog v-model="dialog" max-width="500px">
      <v-form v-model="valid">
        <v-card>
          <v-card-title>
            <span class="headline">Ajouter votre plat</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="platTitle"
              :rules="[v => !!v || 'Un libelle est requis']"
              label="Libelle du plat"
              required
            ></v-text-field>
            <v-text-field prefix="$" v-model="platPrice" :rules="priceRules" label="Prix" required></v-text-field>

            <v-select
              v-model="platSelect"
              :items="types"
              item-text="libelle"
              item-value="@id"
              :rules="[v => !!v || 'Ce champ est requis']"
              label="Type de votre plat"
              required
            ></v-select>
            <v-col cols="12">
              <v-textarea v-model="platDescription" required>
                <template v-slot:label>
                  <div>
                    Description
                    <small>(optional)</small>
                  </div>
                </template>
              </v-textarea>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text
              color="primary"
              :disabled="!valid || loadingPost"
              :loading="loadingPost"
              @click="save"
            >Sauvegarder</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </section>
</template>

<script>
import Plat from "./Dish";
export default {
  props: ["initialRestaurant"],
  data() {
    return {
      loadingPost: false,
      valid: true,
      types: [],
      restaurant: this.initialRestaurant,
      platSelect: "",
      platTitle: "",
      platPrice: "",
      platDescription: null,

      priceRules: [
        v => !!v || "Un prix est requise",
        v => !isNaN(v) || "Veuillez entrer une valeur numérique"
      ],
      dialog: false
    };
  },
  components: {
    Plat
  },
  mounted() {
    this.$http
      .get("http://localhost:3000/api/plats_types")
      .then(response => (this.types = response.data["hydra:member"]));
  },
  methods: {
    async getRestaurant() {
      await this.$http
        .get("http://localhost:3000/api/restaurants/" + this.restaurant.id)
        .then(response => {
          this.restaurant = response.data;
        });
    },
    async save() {
      this.loadingPost = true;
      await this.$http
        .post("http://localhost:3000/api/plats", {
          libelle: this.platTitle,
          prix: parseFloat(this.platPrice),
          platType: this.platSelect,
          description: this.platDescription,
          restaurant: this.restaurant["@id"]
        })
        .then()
        .catch(e => {
          this.errors.push(e);
        });
      await this.$http
        .get("http://localhost:3000/api/restaurants/" + this.restaurant.id)
        .then(response => {
          this.restaurant = response.data;
        });
      this.$store.dispatch(
        "notifications/addNotification",
        {
          type: "success",
          message: "Added dish"
        },
        { root: true }
      );

      this.loadingPost = false;
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>