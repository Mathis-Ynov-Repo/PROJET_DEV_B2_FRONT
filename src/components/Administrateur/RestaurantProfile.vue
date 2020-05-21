<template>
  <div>
    <!-- <v-container>
      <v-row class="mb-6 flex-row" no-gutters v-if="!restaurant.plats">
        <v-col cols="12">
          <v-skeleton-loader
            class="mx-auto my-12"
            max-width="374"
            v-if="!restaurant.plats"
            type="image,list-item-two-line, article, actions"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>-->
    <v-card max-width="374" v-if="restaurant.plats" class="mx-auto">
      <v-img
        height="250"
        :src="
          restaurant.image
            ? 'http://localhost:3000/images/products/' + restaurant.image.filePath
            : 'http://localhost:3000/images/products/evznztwwkaixz87-5ea2e6972b6c4283633580.jpg'
        "
      ></v-img>

      <v-card-text style="position: relative" class="py-0">
        <v-btn absolute dark fab top right color="pink" @click="editPicture()">
          <v-icon>mdi-camera</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-title>{{ restaurant.libelle }}</v-card-title>
      <v-card-subtitle>{{ restaurant.description }}</v-card-subtitle>

      <v-card-title v-if="restaurant.adresse">Adress : {{ restaurant.adresse }}</v-card-title>
      <v-card-text v-else>No registered adress</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text color="primary" @click="editProfile(restaurant)">Edit Profile</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="imgDialog" max-width="600px" class="white--background">
      <v-form ref="form" v-model="validImg" :lazy-validation="false">
        <v-card>
          <v-card-title>
            <span class="headline">Restaurant Image</span>
          </v-card-title>
          <v-col class="d-flex flex-column">
            <v-image-input
              :rules="rules"
              value="File"
              :imageWidth="374"
              v-model="restaurantImg"
              :image-quality="0.85"
              clearable
              image-format="png"
              required
            />

            <v-btn
              :disabled="!validImg || loadingImg"
              :loading="loadingImg"
              color="success"
              class="mr-5"
              @click="validate"
            >
              Upload
              <v-icon>mdi-upload</v-icon>
            </v-btn>
          </v-col>
        </v-card>
      </v-form>
    </v-dialog>

    <v-dialog v-model="dialog" max-width="500px">
      <v-form ref="restaurantForm" v-model="validRestaurantForm">
        <v-card>
          <v-card-title>
            <span class="headline">Restaurant Informations</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="updatedRestaurant.libelle"
              :rules="[(v) => !!v || 'A title is required']"
              label="Title"
              required
            ></v-text-field>
            <v-col cols="12">
              <v-textarea v-model="updatedRestaurant.description" required>
                <template v-slot:label>
                  <div>
                    Description
                    <small>(optional)</small>
                  </div>
                </template>
              </v-textarea>
            </v-col>
            <v-text-field
              v-model="updatedRestaurant.adresse"
              :rules="[(v) => !!v || 'An adress is required']"
              label="Adress"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              :disabled="!validRestaurantForm || loadingPut"
              :loading="loadingPut"
              @click="updateRestaurant(updatedRestaurant)"
            >Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import VImageInput from "vuetify-image-input/a-la-carte";

export default {
  components: {
    VImageInput
  },
  props: ["initialRestaurant"],
  data: function() {
    return {
      dialog: false,
      imgDialog: false,
      loadingImg: false,
      loadingPut: false,
      restaurant: this.initialRestaurant,
      validRestaurantForm: true,
      restaurantImg: null,
      validImg: true,
      updatedRestaurant: {},
      newRestaurant: {},
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "restaurant image size should be less than 2 MB!"
      ]
    };
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.postRestaurantImg();
      }
    },

    editProfile(restaurant) {
      this.dialog = true;
      this.updatedRestaurant = Object.assign({}, restaurant);
    },
    editPicture() {
      this.imgDialog = true;
    },

    async updateRestaurant(restaurant) {
      this.loadingPut = true;
      await this.$http
        .put("http://localhost:3000/api/restaurants/" + restaurant.id, {
          libelle: this.updatedRestaurant.libelle,
          adresse: this.updatedRestaurant.adresse,
          description: this.updatedRestaurant.description
        })
        .then(response => {
          this.restaurant = response.data;
          this.$store.dispatch(
            "restaurant/updateRestaurantAdmin",
            this.restaurant
          );
        });
      this.dialog = false;
      this.loadingPut = false;
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
    async postRestaurantImg() {
      this.loadingImg = true;
      let file = this.dataURItoBlob(this.restaurantImg);

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
            .put(
              "http://localhost:3000/api/restaurants/" + this.restaurant.id,
              {
                image: response.data["@id"]
              }
            )
            .then(response => {
              this.restaurant.image = response.data.image;
              this.$store.dispatch(
                "restaurant/updateRestaurantAdmin",
                this.restaurant
              );
            })
        );
      this.loadingImg = false;
      this.imgDialog = false;
    }
  }
};
</script>

<style></style>
