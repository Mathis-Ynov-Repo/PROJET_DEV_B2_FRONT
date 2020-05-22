<template>
  <div class="dashboard">
    <v-parallax dark src="/images/mike-dorner-sf_1ZDA1YFw-unsplash.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">Hey Admin</h1>
          <h4 class="subheading">Start administrating now!</h4>
        </v-col>
      </v-row>
    </v-parallax>
    <restaurants-info :nbResto="restaurants"></restaurants-info>
    <h1>Orders Statistics</h1>
    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <stats-card
          :data="DelivedredOrders * 2.5 +' $'"
          domain="All Time Income"
          icon="mdi-cash-usd-outline"
          color="success"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <stats-card
          :data="DelivedredOrders"
          domain="Delivered"
          icon="mdi-food-fork-drink"
          color="primary"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <stats-card :data="AbandonnedOrders" domain="Abandonned" icon="mdi-delete" color="error" />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <stats-card :data="InProgressOrders" domain="In Progress" icon="mdi-bike" color="warning" />
      </v-col>
    </v-row>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import StatsCard from "@/components/Administrateur/StatsCard";
import RestaurantsInfo from "@/components/Administrateur/RestaurantsInfo";
export default {
  data() {
    return {
      loading: true,
      restaurants: [],
      orders: []
    };
  },
  components: {
    StatsCard,
    RestaurantsInfo
  },
  name: "AdminDashboard",
  async mounted() {
    this.loading = true;
    await this.getRestaurants();
    await this.getCommandes();
    this.loading = false;
  },
  computed: {
    DelivedredOrders() {
      return this.orders.filter(function(order) {
        return order.statut.match("livrée");
      }).length;
    },
    AbandonnedOrders() {
      return this.orders.filter(function(order) {
        return order.statut.match("abandonnée");
      }).length;
    },
    InProgressOrders() {
      return this.orders.filter(function(order) {
        return order.statut.match("en cours");
      }).length;
    }
  },
  methods: {
    async getCommandes() {
      await this.$http
        .get("http://localhost:3000/api/commandes?pagination=false")
        .then(response => {
          this.orders = response.data["hydra:member"];
        });
    },

    async getRestaurants() {
      await this.$http
        .get("http://localhost:3000/api/restaurants?pagination=false")
        .then(response => {
          this.restaurants = response.data["hydra:member"];
        });
    }
  }
};
</script>
