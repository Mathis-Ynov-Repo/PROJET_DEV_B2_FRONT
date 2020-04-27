<template>
  <div class="home">
    <h1>homepâge</h1>
    <v-btn class="pink white--text">CLICK ME</v-btn>
    <v-btn depressed class="pink hidden-md-and-down">Pelo</v-btn>
    <v-btn color="purple" small fab>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <restaurants-info :nbResto="restaurants"></restaurants-info>
    <h1>Statistiques de commandes</h1>
    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <stats-card
          :data="NbOrdersDelivered * 2.99 +' $'"
          domain="Revenus"
          icon="mdi-cash-usd-outline"
          color="success"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <stats-card
          :data="NbOrdersDelivered"
          domain="Livrées"
          icon="mdi-food-fork-drink"
          color="primary"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <stats-card
          :data="NbAbandonnedOrders"
          domain="Abandonnées"
          icon="mdi-delete"
          color="error"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <stats-card :data="NbOrdersPending" domain="En cours" icon="mdi-bike" color="warning" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import StatsCard from "@/components/Administrateur/StatsCard";
import RestaurantsInfo from "@/components/Administrateur/RestaurantsInfo";
export default {
  data() {
    return {
      NbOrdersDelivered: null,
      NbOrdersPending: null,
      NbAbandonnedOrders: null,
      restaurants: []
    };
  },
  components: {
    StatsCard,
    RestaurantsInfo
  },
  name: "AdminDashboard",
  async mounted() {
    this.getRestaurants();
    this.getCommandesDelivered();
    this.getCommandes();
    this.getCommandesAbandonnée();
  },
  methods: {
    async getCommandesDelivered() {
      await this.$http
        .get("http://localhost:3000/api/commandes?statut=livrée")
        .then(response => {
          this.NbOrdersDelivered = response.data["hydra:totalItems"];
        });
    },
    async getCommandes() {
      await this.$http
        .get("http://localhost:3000/api/commandes?statut=en cours")
        .then(response => {
          this.NbOrdersPending = response.data["hydra:totalItems"];
        });
    },
    async getCommandesAbandonnée() {
      await this.$http
        .get("http://localhost:3000/api/commandes?statut=abandonnée")
        .then(response => {
          this.NbAbandonnedOrders = response.data["hydra:totalItems"];
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
