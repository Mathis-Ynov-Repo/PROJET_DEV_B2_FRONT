<template>
  <div>
    <!-- <v-container>
      <v-row class="mb-6 flex-row" no-gutters v-if="!user.plats">
        <v-col cols="12">
          <v-skeleton-loader
            class="mx-auto my-12"
            max-width="374"
            v-if="!user.plats"
            type="image,list-item-two-line, article, actions"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>-->
    <v-card max-width="374" v-if="user" class="mx-auto">
      <v-img
        height="250"
        :src="
          user.image
            ? 'http://localhost:3000/images/products/' + user.image.filePath
            : 'http://localhost:3000/images/products/evznztwwkaixz87-5ea2e6972b6c4283633580.jpg'
        "
      ></v-img>

      <v-card-text style="position: relative" class="py-0">
        <v-btn absolute dark fab top right color="pink" @click="editPicture()">
          <v-icon>mdi-camera</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-title>{{ user.name }} {{ user.surname }}</v-card-title>
      <v-card-title>Email</v-card-title>
      <v-card-subtitle>{{ user.email }}</v-card-subtitle>

      <v-card-title v-if="user.adress">Adresse : {{ user.adress }}</v-card-title>
      <v-card-text v-else>Pas d'adresse enregistrée</v-card-text>

      <v-card-text>Solde : {{ user.balance ? user.balance : 0 }} $</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text color="primary" @click="editProfile(user)">Edit Profile</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="imgDialog" max-width="600px" class="white--background">
      <v-form ref="form" v-model="validImg" :lazy-validation="false">
        <v-card>
          <v-card-title>
            <span class="headline">User image</span>
          </v-card-title>
          <v-col class="d-flex flex-column">
            <v-image-input
              :rules="rules"
              value="File"
              :imageWidth="374"
              v-model="userImg"
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
      <v-form ref="userForm" v-model="validUserForm">
        <v-card>
          <v-card-title>
            <span class="headline">Mettre à jour votre profil</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="updatedUser.name"
                  :rules="[(v) => !!v || 'Un nom est requis']"
                  label="Last Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="updatedUser.surname"
                  :rules="[(v) => !!v || 'Un prénom est requis']"
                  label="First Name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field v-model="updatedUser.email" :rules="emailRules" label="Email" required></v-text-field>
            <v-text-field
              v-model="updatedUser.adress"
              :rules="[(v) => !!v || 'Une adresse est requise']"
              label="Adresse"
              required
            ></v-text-field>
            <v-subheader>Balance</v-subheader>
            <v-slider
              v-model.number="updatedUser.balance"
              step="1"
              :min="1"
              :max="1000"
              class="px-12"
              thumb-label
              type="number"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text
              color="primary"
              :disabled="!validUserForm"
              @click="updateUser(updatedUser)"
            >Sauvegarder</v-btn>
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
  props: ["initialUser"],
  data: function() {
    return {
      dialog: false,
      imgDialog: false,
      user: this.initialUser,
      validUserForm: true,
      userImg: null,
      validImg: true,
      updatedUser: {},
      newUser: {},
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "user image size should be less than 2 MB!"
      ]
    };
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.postUserImg();
      }
    },

    editProfile(user) {
      this.dialog = true;
      this.updatedUser = Object.assign({}, user);
    },
    editPicture() {
      this.imgDialog = true;
    },

    async updateUser(user) {
      await this.$http
        .put("http://localhost:3000/api/users/" + user.id, {
          name: this.updatedUser.name,
          surname: this.updatedUser.surname,
          adress: this.updatedUser.adress,
          email: this.updatedUser.email,
          balance: this.updatedUser.balance
        })
        .then(response => {
          this.user = response.data;
          this.$store.dispatch("authentication/updateUserAdmin", this.user);
        });
      this.dialog = false;
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
    async postUserImg() {
      let file = this.dataURItoBlob(this.userImg);

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
            .put("http://localhost:3000/api/users/" + this.user.id, {
              image: response.data["@id"]
            })
            .then(response => {
              this.user.image = response.data.image;
              this.$store.dispatch("authentication/updateUserAdmin", this.user);
            })
        );
      this.imgDialog = false;
    }
  }
};
</script>

<style></style>
