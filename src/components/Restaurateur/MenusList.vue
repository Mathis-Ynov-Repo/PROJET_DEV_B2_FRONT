<template>
  <section id="owner_plats_list" class="secondary">
    <v-container class="secondary">
      <v-row class="mb-6 flex-row" no-gutters v-if="!OwnerRestaurant.menus">
        <v-col cols="12" md="6" lg="4" xl="3" v-for="n in 4" :key="n">
          <v-skeleton-loader
            class="mx-auto my-12"
            max-width="374"
            v-if="!OwnerRestaurant.menus"
            type="image,list-item-two-line, article, actions"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row
        class="mb-6 flex-row"
        no-gutters
        v-if="OwnerRestaurant.menus && OwnerRestaurant.menus.length > 0"
      >
        <Menu
          v-for="menu in OwnerRestaurant.menus"
          :key="menu.id"
          :menu="menu"
          :plats="OwnerRestaurant.plats"
        />
      </v-row>
      <v-row class="mb-6 flex-row" no-gutters v-else>No menus so far</v-row>
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
            <span class="headline">Add your menu</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="menuTitle"
              :rules="[v => !!v || 'A title is required']"
              label="Menu Title"
              required
            ></v-text-field>
            <v-text-field prefix="$" v-model="menuPrice" :rules="priceRules" label="Price" required></v-text-field>

            <v-select
              v-model="menuSelect"
              :items="OwnerRestaurant.plats"
              item-text="libelle"
              item-value="@id"
              :rules="[v => !!v || 'This field is required']"
              label="Item number 1"
              required
            ></v-select>
            <v-select
              v-model="menuSelect2"
              :items="OwnerRestaurant.plats"
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
import { mapState, mapActions } from "vuex";
import Menu from "./Menu";
export default {
  //   props: ["plats"],
  data() {
    return {
      loadingPost: false,
      loading: true,
      valid: true,
      menuSelect: "",
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
  computed: {
    ...mapState("restaurant", ["OwnerRestaurant"])
  },
  //   async mounted() {
  //     this.loading = true;

  //     await this.getRestaurant(this.$store.getters["authentication/authUser"].id);
  //     this.loading = false;
  //   },
  methods: {
    async save() {
      this.loadingPost = true;
      await this.$http
        .post("http://localhost:3000/api/menus", {
          libelle: this.menuTitle,
          prix: parseFloat(this.menuPrice)
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
    },
    ...mapActions({
      getRestaurant: "restaurant/getRestaurantWithOwner"
    })
  }
};
</script>

<style>
</style>