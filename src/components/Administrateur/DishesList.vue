<template>
  <section id="admin_plats_list" class="secondary">
    <v-container class="secondary">
      <h2>All the Dishes from {{restaurant.libelle}}</h2>
      <v-row
        class="mb-6 flex-row"
        no-gutters
        v-if="restaurant.plats && restaurant.plats.length > 0"
      >
        <Plat :types="types" v-for="plat in restaurant.plats" :key="plat.id" :plat="plat" />
      </v-row>
      <v-row v-else>
        <v-col>
          <h3>No Dishes added yet</h3>
        </v-col>
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
            <span class="headline">Add a Dish</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="platTitle"
              :rules="[v => !!v || 'A title is required']"
              label="Dish Title"
              required
            ></v-text-field>
            <v-text-field prefix="$" v-model="platPrice" :rules="priceRules" label="Price" required></v-text-field>

            <v-select
              v-model="platSelect"
              :items="types"
              item-text="libelle"
              item-value="@id"
              :rules="[v => !!v || 'This field is required']"
              label="Dish Type"
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
            >Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </section>
</template>

<script>
import Plat from "./Dish";
export default {
  props: ["restaurant"],
  data() {
    return {
      loadingPost: false,
      valid: true,
      types: [],
      // restaurant: this.initialRestaurant,
      platSelect: "",
      platTitle: "",
      platPrice: "",
      platDescription: null,

      priceRules: [
        v => !!v || "A price is required",
        v => !isNaN(v) || "Please enter a numeric value"
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
      await this.$parent.getRestaurant(this.$route.params.id);
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
      await this.getRestaurant();
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