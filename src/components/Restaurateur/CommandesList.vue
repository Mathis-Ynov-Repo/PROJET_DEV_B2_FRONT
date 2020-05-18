<template>
  <v-lazy>
    <v-data-table
      :headers="headers"
      :items="commandes"
      :loading="loading ? true : false"
      :single-expand="true"
      :expanded.sync="expanded"
      item-key="id"
      loading-text="Loading data..."
      show-expand
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Orders Table</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.statut="{ item }">
        <v-chip :color="getColor(item.statut)" dark>{{ item.statut }}</v-chip>
      </template>
      <template v-slot:expanded-item="{ item:childItem, headers }">
        <td :colspan="headers.length">
          <v-row v-for="item in childItem.commandePlats" :key="item.id">
            <v-col cols="2" sm="1">
              <v-icon v-if="item.plat">mdi-pasta</v-icon>
              <v-icon v-else-if="item.menu">mdi-food-fork-drink</v-icon>
              <v-icon v-else>mdi-alert-circle</v-icon>
            </v-col>
            <v-col cols="2" sm="1">
              <h3>{{item.quantity}}x</h3>
            </v-col>
            <v-col cols="2" sm="1">
              <h3>{{item.prix}}$</h3>
            </v-col>
            <v-col cols="6" sm="9">
              <p v-if="item.plat" v-text="item.plat.libelle"></p>
              <p v-else-if="item.menu" v-text="item.menu.libelle"></p>
              <p v-else>This dish / menu has been deleted by the restaurant</p>
            </v-col>
          </v-row>
        </td>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          v-if="item.statut == 'en cours'"
          small
          class="mr-2"
          @click="confirmDelivery(item)"
        >mdi-check-outline</v-icon>
        <v-icon small @click="AbandonCommand(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-lazy>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      expanded: [],
      commandes: [],
      loading: false,
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id"
        },
        { text: "Price", value: "prix" },
        { text: "Fees", value: "frais" },
        { text: "Date of order", value: "dateAchat" },
        { text: "Status", value: "statut" },
        { text: "Actions", value: "actions", sortable: false },
        { text: "", value: "data-table-expand" }
      ]
    };
  },
  computed: {
    ...mapState("restaurant", ["OwnerRestaurant"])
  },
  created() {
    this.getCommandes();
  },
  methods: {
    async getCommandes() {
      this.loading = true;
      await this.$http
        .get("http://localhost:3000/api/commandes?pagination=false")
        .then(response => (this.commandes = response.data["hydra:member"]));
      this.loading = false;
    },
    async AbandonCommand(item) {
      if (confirm("Abandon this order ?")) {
        this.loading = true;
        await this.$http
          .put("http://localhost:3000/api/commandes/" + item.id, {
            statut: "abandonnée"
          })
          .then()
          .catch(e => {
            this.errors.push(e);
            console.log(this.errors);
          });
      }
      await this.getCommandes();
      this.loading = false;
    },
    async confirmDelivery(item) {
      if (confirm("Confirm the delivery of this order ?")) {
        this.loading = true;
        await this.$http
          .put("http://localhost:3000/api/commandes/" + item.id, {
            statut: "livrée"
          })
          .then()
          .catch(e => {
            this.errors.push(e);
            console.log(this.errors);
          });
      }
      await this.getCommandes();
      this.loading = false;
    },
    getColor(statut) {
      if (statut == "abandonnée") return "red";
      else if (statut == "en cours") return "orange";
      else return "green";
    }
  }
};
</script>

<style>
</style>