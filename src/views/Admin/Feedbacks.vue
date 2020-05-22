<template>
  <v-data-table
    :headers="headers"
    :items="feedbacks"
    :items-per-page="10"
    :loading="loading ? true : false"
    loading-text="Loading data..."
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD Feedbacks</v-toolbar-title>

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
                  <v-col cols="12">
                    <v-rating v-model="editedItem.rating" label="Rating"></v-rating>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea v-model="editedItem.message" label="Message"></v-textarea>
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
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
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
      feedbacks: [],
      dialog: false,
      loading: false,
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "id"
        },
        { text: "User", value: "user.email" },
        { text: "Restaurant", value: "restaurant.libelle" },
        { text: "Message", value: "message" },
        { text: "Rating", value: "rating" },
        { text: "Date de création", value: "created" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        id: 1,
        message: "",
        rating: 0
      },
      defaultItem: {
        id: 1,
        message: "",
        rating: 0
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
      await this.getFeedbacks();
      this.loading = false;
    },

    async getFeedbacks() {
      await axios
        .get("http://localhost:3000/api/feedback?pagination=false")
        .then(response => (this.feedbacks = response.data["hydra:member"]));
    },

    editItem(item) {
      this.editedIndex = this.feedbacks.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialog = true;
    },

    async deleteItem(item) {
      if (confirm("Are you sure you want to delete this item?")) {
        this.loading = true;
        await axios
          .delete("http://localhost:3000/api/feedback/" + item.id)
          .then()
          .catch(e => {
            this.errors.push(e);
            console.log(this.errors);
          });
      }
      await this.getFeedbacks();
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
          .put("http://localhost:3000/api/feedback/" + this.editedItem.id, {
            message: this.editedItem.message,
            rating: this.editedItem.rating
          })
          .then()
          .catch(e => {
            this.errors.push(e);
          });
        await this.getFeedbacks();
      } else {
        await axios
          .post("http://localhost:3000/api/feedback", {
            message: this.editedItem.message,
            rating: this.editedItem.rating
          })
          .then()
          .catch(e => {
            this.errors.push(e);
          });
        await this.getFeedbacks();
      }
      this.loading = false;
      this.close();
    }
  }
};
</script>