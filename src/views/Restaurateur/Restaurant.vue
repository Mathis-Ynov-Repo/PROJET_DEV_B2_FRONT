<template>
  <div>
    <h1 class="text-center">Your Restaurant</h1>
    <v-row>
      <v-col>
        <restaurant-profile></restaurant-profile>
      </v-col>
      <v-col align-self="center">
        <!-- <commandes-list v-if="OwnerRestaurant.id" /> -->
        <commandes-list />
      </v-col>
    </v-row>
    <h1>Every Dish from your restaurant</h1>
    <plat-list />
    <h1>Every Menu from your restaurant</h1>
    <menu-list />
    <feedback-list :restaurant="OwnerRestaurant"></feedback-list>
  </div>
</template>

<script>
import PlatList from "@/components/Restaurateur/PlatsList.vue";
import MenuList from "@/components/Restaurateur/MenusList.vue";
import RestaurantProfile from "@/components/Restaurateur/RestaurantProfile.vue";
import CommandesList from "@/components/Restaurateur/CommandesList.vue";
import FeedbackList from "@/components/FeedbackList.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    PlatList,
    MenuList,
    CommandesList,
    RestaurantProfile,
    FeedbackList
  },
  computed: {
    ...mapState("restaurant", ["OwnerRestaurant"])
  },
  methods: {
    ...mapActions({
      getRestaurant: "restaurant/getRestaurantWithOwner"
    })
  }
};
</script>

<style>
</style>