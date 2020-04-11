<template>
  <div id="app">
    <v-snackbar v-if="authStatus == 'success'">
      Hé
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Login form</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Login"
                      v-model="email"
                      name="login"
                      prepend-icon="mdi-account"
                      type="text"
                    ></v-text-field>

                    <v-text-field
                      id="password"
                      label="Password"
                      v-model="password"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="login()">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      snackbar: true
    };
  },
  methods: {
    login() {
      let username = this.email;
      let password = this.password;
      this.$store
        .dispatch("authentication/login", { username, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  },
  computed: {
    ...mapGetters({
      authStatus: "authentication/authStatus"
    })
  }
};
</script>

<style>
</style>