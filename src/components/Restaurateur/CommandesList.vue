<template>
  <v-lazy>
    <v-data-table
      :headers="headers"
      :items="commandes"
      :loading="loading ? true : false"
      :single-expand="true"
      :expanded.sync="expanded"
      item-key="id"
      loading-text="Chargement des données"
      show-expand
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Table des commandes</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.statut="{ item }">
        <v-chip :color="getColor(item.statut)" dark>{{ item.statut }}</v-chip>
      </template>
      <template v-slot:expanded-item="{ item:childItem }">
        <!-- <v-data-table :headers="headers" :items="item.commandePlats"></v-data-table> -->
        <!-- <td :colspan="headers.length">
        <ul>
          <li
            v-for="details in item.commandePlats"
            :key="details.libelle"
          >{{details.plat.libelle || details.menu.libelle}} ° {{details.prix}} $</li>
        </ul>
        </td>-->
        <v-list-item v-for="item in childItem.commandePlats" :key="item.id">
          <v-list-item-icon>
            <v-icon v-if="item.plat">mdi-pasta</v-icon>
            <v-icon v-else>mdi-food-fork-drink</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.prix"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title v-text="item.plat.libelle || item.menu.libelle"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
        { text: "prix", value: "prix" },
        { text: "frais", value: "frais" },
        { text: "date d'achat", value: "dateAchat" },
        { text: "statut", value: "statut" },
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
      await this.$http
        .get(
          "http://localhost:3000/api/commandes?pagination=false&restaurant=" +
            this.OwnerRestaurant.id
        )
        .then(response => (this.commandes = response.data["hydra:member"]));
    },
    async AbandonCommand(item) {
      if (confirm("Abandonner cette commande ?")) {
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
      if (confirm("Confirmer la livraison de cette commande ?")) {
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