<template>
  <div>
    <restaurant-profile></restaurant-profile>
    <h1>Tous les plats de votre resto</h1>
    <plat-list />
    <commandes-list v-if="OwnerRestaurant.id" />
  </div>
</template>

<script>
import PlatList from "@/components/Restaurateur/PlatsList.vue";
import RestaurantProfile from "@/components/Restaurateur/RestaurantProfile.vue";
import CommandesList from "@/components/Restaurateur/CommandesList.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    PlatList,
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