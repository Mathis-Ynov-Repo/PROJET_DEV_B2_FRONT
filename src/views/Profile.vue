<template>
  <div class="container align-center d-flex flex-column">
    Profil utilisateur {{user.name +' '+ user.surname}}
    <v-form ref="form" v-model="valid" lazy-validation class="my-5">
      <v-file-input
        :rules="rules"
        v-model="avatar"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Pick an avatar"
        prepend-icon="mdi-camera"
        label="Avatar"
      ></v-file-input>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Changer PP</v-btn>
    </v-form>
    <v-card max-width="374">
      <v-img height="250" :src="'http://localhost:3000/images/products/'+user.image"></v-img>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    avatar: null,
    valid: false,
    newUser: {},
    rules: [
      value =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!"
    ]
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.postAvatar();
      }
    },
    async postAvatar() {
      let formData = new FormData();
      formData.append("file", this.avatar);
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
              (this.newUser = this.user),
                (this.newUser.image = response.data.image.filePath),
                console.log(this.user),
                console.log(this.newUser),
                localStorage.setItem("user", JSON.stringify(this.newUser));
            })
        );
    }
  },
  computed: {
    ...mapState("authentication", ["user"])
  }
};
</script>

<style>
</style>