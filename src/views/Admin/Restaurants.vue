<template>
  <v-data-table
    :headers="headers"
    :items="restaurants"
    :items-per-page="5"
    :loading="loading ? true : false"
    loading-text="Loading data..."
    sort-by="created"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD Restaurants</v-toolbar-title>

        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.libelle" label="Title"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.adresse" label="Adress"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="types"
                      item-text="type"
                      return-object
                      label="Type"
                      v-model="editedItem.type"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
      <router-link
        :restaurant="item"
        router
        :to="{name:'AdminRestaurantPage', params: {id:item.id}}"
      >
        <v-icon small>mdi-subdirectory-arrow-right</v-icon>
      </router-link>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      errors: [],
      types: [],
      restaurants: [],
      dialog: false,
      loading: false,
      headers: [
        {
          text: "Restaurants",
          align: "start",
          sortable: true,
          value: "libelle"
        },
        { text: "Adress", value: "adresse" },
        { text: "Type", value: "type.type" },
        { text: "Creation Date", value: "created" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        libelle: "",
        adresse: "",
        type: "/api/restaurant_types/1"
      },
      defaultItem: {
        libelle: "",
        adresse: "",
        type: "/api/restaurant_types/1"
      }
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  async created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.loading = true;
      await this.getRestaurants();
      await this.getRestaurantsTypes();
      this.loading = false;
    },

    async getRestaurants() {
      await axios
        .get("http://localhost:3000/api/restaurants?pagination=false")
        .then(response => (this.restaurants = response.data["hydra:member"]));
    },

    async getRestaurantsTypes() {
      await axios
        .get("http://localhost:3000/api/restaurant_types")
        .then(response => (this.types = response.data["hydra:member"]));
    },

    editItem(item) {
      this.editedIndex = this.restaurants.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialog = true;
    },

    async deleteItem(item) {
      if (confirm("Are you sure you want to delete this item?")) {
        this.loading = true;
        await axios
          .delete("http://localhost:3000/api/restaurants/" + item.id)
          .then()
          .catch(e => {
            this.errors.push(e);
            console.log(this.errors);
          });
      }
      await this.getRestaurants();
      this.loading = false;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      this.loading = true;
      if (this.editedIndex > -1) {
        await axios
          .put("http://localhost:3000/api/restaurants/" + this.editedItem.id, {
            adresse: this.editedItem.adresse,
            libelle: this.editedItem.libelle,
            type: this.editedItem.type["@id"]
          })
          .then()
          .catch(e => {
            this.errors.push(e);
          });
        await this.getRestaurants();
      } else {
        await axios
          .post("http://localhost:3000/api/restaurants", {
            adresse: this.editedItem.adresse,
            libelle: this.editedItem.libelle,
            type: this.editedItem.type["@id"]
          })
          .then()
          .catch(e => {
            this.errors.push(e);
          });
        await this.getRestaurants();
      }
      this.loading = false;
      this.close();
    }
  }
};
</script>