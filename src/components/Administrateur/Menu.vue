<template>
  <v-col cols="12" md="6" lg="4" xl="3">
    <v-card class="mx-auto my-12" max-width="374">
      <v-card-title>{{menu.libelle}}</v-card-title>
      <v-card-title class="grey--text py-0">{{menu.prix}} $</v-card-title>
      <v-list>
        <v-list-item v-for="detail in menu.menuDetails" :key="detail.plat.id">
          <v-list-item-avatar>
            <v-img
              :src="detail.plat.image ? 'http://localhost:3000/images/products/' + detail.plat.image.filePath : 'https://source.unsplash.com/random' "
            ></v-img>
          </v-list-item-avatar>
          {{detail.plat.libelle}} ({{detail.plat.prix}}$)
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="warning" :loading="loadingPut" @click="editMenuDialog(menu)">
          <v-icon>mdi-pencil</v-icon>Edit
        </v-btn>

        <v-btn color="error" :loading="loadingDelete" @click="deleteMenuDialog(menu)">
          <v-icon>mdi-delete</v-icon>Delete
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" max-width="500px">
      <v-form v-model="valid">
        <v-card>
          <v-card-title>
            <span class="headline">Update your menu</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="updatedItem.libelle"
              :rules="[v => !!v || 'A title is required']"
              label="Menu Title"
              required
            ></v-text-field>
            <v-text-field
              prefix="$"
              v-model="updatedItem.prix"
              :rules="priceRules"
              label="Price"
              required
            ></v-text-field>

            <v-select
              v-model="updatedItem.plat1"
              :items="plats"
              item-text="libelle"
              item-value="@id"
              :rules="[v => !!v || 'This field is required']"
              label="Item number 1"
              required
            ></v-select>
            <v-select
              v-model="updatedItem.plat2"
              :items="plats"
              item-text="libelle"
              item-value="@id"
              :rules="[v => !!v || 'This field is required']"
              label="Item number 2"
              required
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text
              color="primary"
              :disabled="!valid || loadingPut"
              :loading="loadingPut"
              @click="save(updatedItem)"
            >Sauvegarder</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loading: true,
      loadingPut: false,
      loadingDelete: false,
      dialog: false,
      validImg: true,
      imgDialog: false,
      updatedItem: {},
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "plat image size should be less than 2 MB!"
      ],
      valid: true,
      priceRules: [
        v => !!v || "Un prix est requise",
        v => !isNaN(v) || "Veuillez entrer une valeur numérique"
      ],
      platTitle: ""
    };
  },

  methods: {
    async deleteMenuDialog(menu) {
      if (confirm("Supprimer ce menu ?")) {
        this.loadingDelete = true;
        await this.deleteMenu(menu);
      }
      await this.$parent.getRestaurant();
      this.loadingDelete = false;
    },
    async editMenuDialog(menu) {
      this.dialog = true;
      this.updatedItem = Object.assign({}, menu);
      this.updatedItem.plat1 = menu.menuDetails[0].plat["@id"];
      this.updatedItem.plat2 = menu.menuDetails[1].plat["@id"];
    },
    async save(menu) {
      this.loadingPut = true;
      menu.prix = parseFloat(menu.prix);
      await this.editMenu(menu);

      this.dialog = false;
      await this.$http
        .get("http://localhost:3000/api/menus/" + this.menu.id)
        .then(response => {
          this.menu = response.data;
        });
      this.loadingPut = false;
    },
    ...mapActions({
      editMenu: "menu/editMenu",
      deleteMenu: "menu/deleteMenu"
    })
  },
  props: ["menu", "plats"]
};
</script>

<style>
</style>