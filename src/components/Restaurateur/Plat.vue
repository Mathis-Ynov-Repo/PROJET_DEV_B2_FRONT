<template>
  <v-col cols="12" md="6" lg="4" xl="3">
    <v-card class="mx-auto my-12" max-width="374">
      <v-img
        height="250"
        :src="plat.image ? 'http://localhost:3000/images/products/' + plat.image.filePath : 'https://cdn.vuetifyjs.com/images/cards/cooking.png' "
      ></v-img>
      <v-card-text style="position: relative" class="py-0">
        <v-btn absolute dark fab top right color="pink" @click="editPicture()">
          <v-icon>mdi-camera</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-title>{{plat.libelle}}</v-card-title>
      <v-card-title class="grey--text py-0">{{plat.prix}} $ • {{plat.platType.libelle}}</v-card-title>
      <v-card-text v-if="plat.description != null">{{plat.description}}</v-card-text>
      <v-card-text v-else>No description available for this product</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="warning" @click="editDish(plat)">
          <v-icon>mdi-pencil</v-icon>Edit
        </v-btn>

        <v-btn color="error" @click="deleteDish(plat)">
          <v-icon>mdi-delete</v-icon>Delete
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="imgDialog" max-width="600px" class="white--background">
      <v-form ref="form" v-model="validImg" :lazy-validation="false">
        <v-card>
          <v-card-title>
            <span class="headline">Image du restaurant</span>
          </v-card-title>
          <v-col class="d-flex flex-column">
            <v-image-input
              :rules="rules"
              value="File"
              :imageWidth="374"
              v-model="platImg"
              :image-quality="0.85"
              clearable
              image-format="png"
              required
            />

            <v-btn :disabled="!validImg" color="success" class="mr-5" @click="validate">
              Upload
              <v-icon>mdi-upload</v-icon>
            </v-btn>
          </v-col>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog v-model="dialog" max-width="500px">
      <v-form v-model="valid">
        <v-card>
          <v-card-title>
            <span class="headline">Mettre à jour votre plat</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="updatedItem.libelle"
              :rules="[v => !!v || 'Un libelle est requis']"
              label="Libelle du plat"
              required
            ></v-text-field>
            <v-text-field
              prefix="$"
              v-model="updatedItem.prix"
              :rules="priceRules"
              label="Prix"
              required
            ></v-text-field>

            <v-select
              v-model="updatedItem.platType"
              :items="this.types"
              item-text="libelle"
              item-value="@id"
              :rules="[v => !!v || 'Ce champ est requis']"
              label="Type de votre plat"
              required
            ></v-select>
            <v-col cols="12">
              <v-textarea v-model="updatedItem.description" required>
                <template v-slot:label>
                  <div>
                    Description
                    <small>(optional)</small>
                  </div>
                </template>
              </v-textarea>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text color="primary" :disabled="!valid" @click="save(updatedItem)">Sauvegarder</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";
import VImageInput from "vuetify-image-input/a-la-carte";
export default {
  components: {
    VImageInput
  },
  data() {
    return {
      loading: true,
      dialog: false,
      validImg: true,
      imgDialog: false,
      platImg: null,
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
    validate() {
      if (this.$refs.form.validate()) {
        this.postPlatImg();
      }
    },
    async postPlatImg() {
      let file = this.dataURItoBlob(this.platImg);

      let formData = new FormData(document.forms[0]);

      formData.append("file", file, "custom.image");

      await this.$http
        .post("http://localhost:3000/api/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response =>
          this.$http
            .put("http://localhost:3000/api/plats/" + this.plat.id, {
              image: response.data["@id"]
            })
            .then(response => {
              // this.newRestaurant = this.OwnerRestaurant;
              this.plat.image = response.data.image;
              this.$store.dispatch("plat/updatePlat");
            })
        );
      this.imgDialog = false;
    },
    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(",")[1]);

      // separate out the mime component
      var mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      //New Code
      return new Blob([ab], { type: mimeString });
    },
    async deleteDish(plat) {
      if (confirm("Supprimer ce plat ?")) {
        await this.deletePlat(plat);
      }
      await this.getRestaurant();
    },
    editPicture() {
      this.imgDialog = true;
    },
    async editDish(plat) {
      this.dialog = true;
      this.updatedItem = Object.assign({}, plat);
    },
    async save(plat) {
      plat.prix = parseFloat(plat.prix);
      await this.editPlat(plat);
      this.dialog = false;
      await this.getRestaurant();
    },
    ...mapActions({
      getRestaurant: "restaurant/getRestaurantWithOwner",
      editPlat: "plat/editPlat",
      deletePlat: "plat/deletePlat"
    })
  },
  props: ["plat", "types"]
};
</script>

<style>
</style>