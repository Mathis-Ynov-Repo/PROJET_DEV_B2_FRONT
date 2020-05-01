<template>
  <div>
    <h1 class="text-center">Votre Restaurant</h1>
    <v-row>
      <v-col>
        <restaurant-profile></restaurant-profile>
      </v-col>
      <v-col align-self="center">
        <!-- <commandes-list v-if="OwnerRestaurant.id" /> -->
        <commandes-list />
      </v-col>
    </v-row>
    <h1>Tous les plats de votre resto</h1>
    <plat-list />
    <menu-list />
  </div>
</template>

<script>
import PlatList from "@/components/Restaurateur/PlatsList.vue";
import MenuList from "@/components/Restaurateur/MenusList.vue";
import RestaurantProfile from "@/components/Restaurateur/RestaurantProfile.vue";
import CommandesList from "@/components/Restaurateur/CommandesList.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    PlatList,
    MenuList,
    CommandesList,
    RestaurantProfile
  },
  // async created() {
  //   this.initialize();
  // },
  computed: {
    ...mapState("restaurant", ["OwnerRestaurant"])
  },
  methods: {
    ...mapActions({
      getRestaurant: "restaurant/getRestaurantWithOwner"
    })
    // async initialize() {
    //   await this.getRestaurant(
    //     this.$store.getters["authentication/authUser"].id
    //   );
    // }
  }
};
</script>

<style>
</style>