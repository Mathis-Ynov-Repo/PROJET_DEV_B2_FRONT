<template>
  <v-data-table
    :headers="headers"
    :items="commandes"
    :items-per-page = 5
    :loading="loading ? true : false"
    loading-text="Chargement des données"
    sort-by="created"
    class="elevation-1"

  >
    <template v-slot:item.statut="{ item }">
      <v-chip :color="getColor(item.statut)" dark>{{ item.statut }}</v-chip>
    </template>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD Commandes</v-toolbar-title>
        
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
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
                    <v-text-field v-model="editedItem.frais" label="frais"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.prix" label="prix"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="types"
                        label="Statut"
                        v-model="editedItem.statut"></v-select>
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
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        errors:[],
        types:['en cours', 'abandonnée', 'livrée'],
        commandes:[],
        dialog: false,
        loading:false,
        headers: [
          {
            text: 'IDCommande',
            align: 'start',
            sortable: true,
            value: 'id',
          },
          { text: 'frais', value: 'frais' },
          { text: 'prix', value: 'prix' },
          { text: 'statut', value: 'statut' },
          { text: 'dataAchat', value: 'created' },
          { text: 'Date de reception', value: 'dateReception' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            frais: 2.99,
            prix: 0,
            statut: '',
        },
        defaultItem: {
            frais: 2.99,
            prix: 0,
            statut: '',
        },
      }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    async created () {
      this.initialize()
    },
    methods: {
      async initialize () {
        this.loading = true;
        await this.getCommandes();
        this.loading = false;
      },

      async getCommandes() {
        await axios.get('http://localhost:8001/api/commandes')
        .then(response => this.commandes = response.data);
      },

      editItem (item) {
        this.editedIndex = this.commandes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        
        this.dialog = true
      },

      async deleteItem (item) {
        if (confirm('Are you sure you want to delete this item?')){
          this.loading = true;
          await axios.delete('http://localhost:8001/api/commandes/'+item.id)
          .then()
          .catch(e => {
            this.errors.push(e)
            console.log(this.errors)
        })
        }
        await this.getCommandes()
        this.loading = false;
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      getColor (statut) {
          switch(statut) {
              case "en cours":
                  return "orange";
                //   break;
              case "livrée":
                  return "green";
                //   break;
              case "abandonnée":
                  return "red";
                //   break;
              default:
                  return "orange";
          }
      },

      async save () {
        this.loading = true;
        if (this.editedIndex > -1) {
          await axios.put('http://localhost:8001/api/commandes/' + this.editedItem.id, {
            frais: this.editedItem.frais,
            prix: this.editedItem.prix,
            statut:this.editedItem.statut,
          })
          .then()
          .catch(e => {
            this.errors.push(e)
        })
        await this.getCommandes()
        } else {
          await axios.post('http://localhost:8001/api/commandes', {
            frais: this.editedItem.frais,
            prix: this.editedItem.prix,
            statut:this.editedItem.statut,
          })
          .then()
          .catch(e => {
            this.errors.push(e)
        })
        await this.getCommandes()       
        }
        this.loading = false;
        this.close()
      },
    },
  }
</script>