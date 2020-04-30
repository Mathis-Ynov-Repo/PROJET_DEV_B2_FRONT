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
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
    </v-overlay>

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
      restaurant: {},
      loading: true
    };
  },

  async mounted() {
    this.loading = true;
    await this.getRestaurant(this.$route.params.id);
    this.loading = false;
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