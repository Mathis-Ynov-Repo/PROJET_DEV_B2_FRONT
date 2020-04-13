<template>
  <v-app>
    <Navbar />
    <v-content class="mx-4">
      <router-view></router-view>
    </v-content>

    <notifications-list />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import NotificationsList from "@/components/NotificationsList";

export default {
  name: "App",

  components: {
    Navbar,
    NotificationsList
  },
  created() {
    let store = this.$store;
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (
          err.response.status === 401 &&
          err.config &&
          !err.config.__isRetryRequest
        ) {
          store.dispatch("authentication/logout");
        }
        throw err;
      });
    });
  },

  data: () => ({
    //
  })
};
</script>
