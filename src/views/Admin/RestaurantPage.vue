<template>
  <div>
    <h1>Page d'adminsitration du restaurant {{restaurant.libelle}}</h1>
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <restaurant-profile v-if="restaurant.id" :initialRestaurant="restaurant"></restaurant-profile>
      </v-col>
      <v-col>
        <restaurant-orders-list v-if="restaurant.id" :restaurant="restaurant"></restaurant-orders-list>
      </v-col>
    </v-row>

    <dishes-list v-if="restaurant.id" :initialRestaurant="restaurant"></dishes-list>
  </div>
</template>

<script>
import RestaurantOrdersList from "@/components/Administrateur/RestaurantOrdersList.vue";
import RestaurantProfile from "@/components/Administrateur/RestaurantProfile.vue";
import DishesList from "@/components/Administrateur/DishesList.vue";
export default {
  components: {
    RestaurantOrdersList,
    RestaurantProfile,
    DishesList
  },
  data() {
    return {
      restaurant: {}
    };
  },

  mounted() {
    this.getRestaurant(this.$route.params.id);
  },
  methods: {
    async getRestaurant(id) {
      await this.$http
        .get("http://localhost:3000/api/restaurants/" + id)
        .then(response => {
          this.restaurant = response.data;
        });
    }
  }
};
</script>

<style>
</style>