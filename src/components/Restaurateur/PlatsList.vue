<template>
  <section id="owner_plats_list" class="secondary">
    <v-container class="secondary">
      <v-row class="mb-6 flex-row" no-gutters v-if="!OwnerRestaurant.plats">
        <v-col cols="12" md="6" lg="4" xl="3" v-for="n in 8" :key="n">
          <v-skeleton-loader
            class="mx-auto my-12"
            max-width="374"
            v-if="!OwnerRestaurant.plats"
            type="image,list-item-two-line, article, actions"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row class="mb-6 flex-row" no-gutters>
        <Plat :types="types" v-for="plat in OwnerRestaurant.plats" :key="plat.id" :plat="plat" />
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
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text color="primary" :disabled="!valid" @click="save">Sauvegarder</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Plat from "./Plat";
export default {
  data() {
    return {
      loading: true,
      valid: true,
      types: [],
      platSelect: "",
      platTitle: "",
      platPrice: "",

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
  computed: {
    ...mapState("restaurant", ["OwnerRestaurant"])
  },
  mounted() {
    this.getRestaurant(this.$store.getters["authentication/authUser"].id);

    this.$http
      .get("http://localhost:3000/api/plats_types")
      .then(response => (this.types = response.data["hydra:member"]));
  },
  methods: {
    // initialize() {
    //   this.loading = true;
    //   await this.getRestaurant(
    //     this.$store.getters["authentication/authUser"].id
    //   );
    //   this.loading = false;
    // },
    async save() {
      this.loading = true;
      await this.$http
        .post("http://localhost:3000/api/plats", {
          libelle: this.platTitle,
          prix: parseFloat(this.platPrice),
          platType: this.platSelect
        })
        .then()
        .catch(e => {
          this.errors.push(e);
        });
      await this.getRestaurant();
      this.loading = false;
      this.dialog = false;
    },
    ...mapActions({
      getRestaurant: "restaurant/getRestaurantWithOwner"
    })
  }
};
</script>

<style>
</style>