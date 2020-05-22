<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :items-per-page="5"
    :loading="loading ? true : false"
    loading-text="Loading data..."
    sort-by="created"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD Users</v-toolbar-title>

        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New User</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                      :rules="[(v) => !!v || 'A last name is required']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.surname"
                      :rules="[(v) => !!v || 'A first name is required']"
                      label="Last Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.adress"
                      :rules="[(v) => !!v || 'An adress is required']"
                      label="Adress"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="8" md="8">
                    <v-text-field v-model="editedItem.email" :rules="emailRules" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.balance" label="Balance"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      :items="roles"
                      item-text="roles"
                      return-object
                      label="Role"
                      v-model="editedItem.roles"
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
      <v-icon small class="mr-2" @click="editUser(item)">mdi-pencil</v-icon>
      <v-icon small class="mr-2" @click="deleteUser(item)">mdi-delete</v-icon>
      <router-link :user="item" router :to="{name:'AdminUserPage', params: {id:item.id}}">
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
      roles: ["ROLE_USER", "ROLE_ADMIN", "ROLE_RESTAURATEUR"],
      users: [],
      dialog: false,
      loading: false,
      emailRules: [
        v => !!v || "An email is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "id"
        },
        { text: "Email", value: "email" },
        { text: "First Name", value: "name" },
        { text: "Last Name", value: "surname" },
        { text: "Adress", value: "adress" },
        { text: "Roles", value: "roles" },
        { text: "Balance", value: "balance" },
        { text: "Last Connection", value: "lastConnection" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        adress: "",
        surname: "",
        balance: 0,
        roles: []
      },
      defaultItem: {
        name: "",
        adress: "",
        surname: "",
        balance: 0,
        roles: []
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
      await this.getUsers();
      this.loading = false;
    },

    async getUsers() {
      await axios
        .get("http://localhost:3000/api/users?pagination=false")
        .then(response => (this.users = response.data["hydra:member"]));
    },

    editUser(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);
      // this.editedItem.type = this.types.find(x => x.type == item.type.type);

      this.dialog = true;
    },

    async deleteUser(item) {
      if (confirm("Are you sure you want to ban this user?")) {
        this.loading = true;
        await axios
          .delete("http://localhost:3000/api/users/" + item.id)
          .then()
          .catch(e => {
            this.errors.push(e);
            console.log(this.errors);
          });
      }
      await this.getUsers();
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
          .put("http://localhost:3000/api/users/" + this.editedItem.id, {
            adress: this.editedItem.adress,
            name: this.editedItem.name,
            surname: this.editedItem.surname,
            roles: [this.editedItem.roles],
            email: this.editedItem.email,
            balance: parseFloat(this.editedItem.balance)
          })
          .then()
          .catch(e => {
            this.errors.push(e);
          });
        await this.getUsers();
      } else {
        await axios
          .post("http://localhost:3000/api/users", {
            adress: this.editedItem.adress,
            name: this.editedItem.name,
            surname: this.editedItem.surname,
            roles: [this.editedItem.roles],
            email: this.editedItem.email,
            balance: parseFloat(this.editedItem.balance),
            password: "motdepasses"
          })
          .then()
          .catch(e => {
            this.errors.push(e);
          });
        await this.getUsers();
      }
      this.loading = false;
      this.close();
    }
  }
};
</script>