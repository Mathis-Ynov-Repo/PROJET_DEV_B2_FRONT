<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-alert v-if="this.authStatus == 'error'" dense outlined type="error">Invalid credentials</v-alert>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                label="Login"
                :rules="[v => !!v || 'E-mail required']"
                v-model="email"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                required
              ></v-text-field>

              <v-text-field
                id="password"
                :rules="[v => !!v || 'Password required']"
                label="Password"
                v-model="password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="!valid" @click="login()">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      valid: false,
      error: ""
    };
  },
  methods: {
    async login() {
      let username = this.email;
      let password = this.password;
      await this.$store
        .dispatch("authentication/login", { username, password })
        .then()
        .catch(err => console.log(err));
      if (this.isRestaurateur) {
        this.$router.push({ name: "RestaurateurRestaurant" });
      } else if (this.isAdmin) {
        this.$router.push({ name: "AdminDashboard" });
      } else {
        this.$router.push({ name: "Home" });
      }
    }
  },
  computed: {
    ...mapGetters({
      authStatus: "authentication/authStatus",
      isRestaurateur: "authentication/isRestaurateur",
      isAdmin: "authentication/isAdmin"
    })
  }
};
</script>

<style>
</style>