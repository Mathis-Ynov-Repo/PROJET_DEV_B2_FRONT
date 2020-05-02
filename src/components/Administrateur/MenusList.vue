<template>
  <section id="owner_plats_list" class="secondary">
    <v-container class="secondary">
      <h2>All the Menus from {{restaurant.libelle}}</h2>
      <v-row
        class="mb-6 flex-row"
        no-gutters
        v-if="restaurant.menus && restaurant.menus.length > 0"
      >
        <Menu
          v-for="menu in restaurant.menus"
          :key="menu.id"
          :menu="menu"
          :plats="restaurant.plats"
        />
      </v-row>
      <v-row class="mb-6 flex-row" no-gutters v-else>No Menu added yet</v-row>
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
            <span class="headline">Add a new menu</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="menuTitle"
              :rules="[v => !!v || 'a title is required']"
              label="Menu Title"
              required
            ></v-text-field>
            <v-text-field prefix="$" v-model="menuPrice" :rules="priceRules" label="Price" required></v-text-field>

            <v-select
              v-model="menuSelect"
              :items="restaurant.plats"
              item-text="libelle"
              item-value="@id"
              :rules="[v => !!v || 'This field is required']"
              label="Item number 1"
              required
            ></v-select>
            <v-select
              v-model="menuSelect2"
              :items="restaurant.plats"
              item-text="libelle"
              item-value="@id"
              :rules="[v => !!v || 'This field is required']"
              label="Item number 2"
              required
            ></v-select>
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
import Menu from "./Menu";
export default {
  props: ["restaurant"],
  data() {
    return {
      loadingPost: false,
      valid: true,
      menuSelect: "",
      // restaurant: this.initialRestaurant,
      menuSelect2: "",
      menuTitle: "",
      menuPrice: "",

      priceRules: [
        v => !!v || "A price is required",
        v => !isNaN(v) || "Please enter a numeric value"
      ],
      dialog: false
    };
  },
  components: {
    Menu
  },
  methods: {
    async getRestaurant() {
      // await this.$http
      //   .get("http://localhost:3000/api/restaurants/" + this.restaurant.id)
      //   .then(response => {
      //     this.restaurant = response.data;
      //   });
      await this.$parent.getRestaurant(this.$route.params.id);
    },
    // async getRestaurant() {
    //   console.log("dc");
    //   await this.$http
    //     .get("http://localhost:3000/api/restaurants/" + this.restaurant.id)
    //     .then(response => {
    //       this.restaurant = response.data;
    //     });
    // },
    async save() {
      this.loadingPost = true;
      await this.$http
        .post("http://localhost:3000/api/menus", {
          libelle: this.menuTitle,
          prix: parseFloat(this.menuPrice),
          restaurant: this.restaurant["@id"]
        })
        .then(async resp => {
          let menu = resp.data;
          await this.$http.post("http://localhost:3000/api/menu_details", {
            menu: menu["@id"],
            plat: this.menuSelect
          });
          await this.$http.post("http://localhost:3000/api/menu_details", {
            menu: menu["@id"],
            plat: this.menuSelect2
          });
        })
        .catch(e => {
          this.errors.push(e);
        });
      // await this.$http
      //   .get("http://localhost:3000/api/restaurants/" + this.restaurant.id)
      //   .then(response => {
      //     this.restaurant = response.data;
      //   });
      await this.getRestaurant();
      this.$store.dispatch(
        "notifications/addNotification",
        {
          type: "success",
          message: "Added Menu"
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