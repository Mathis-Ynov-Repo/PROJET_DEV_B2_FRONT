<template>
  <div>
    <h1>Administration page of user {{user.name}} {{user.surname}}</h1>
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <user-profile v-if="user.id" :initialUser="user"></user-profile>
      </v-col>
      <v-col>
        <user-orders-list v-if="user.id" :user="user"></user-orders-list>
      </v-col>
    </v-row>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
    </v-overlay>

    <user-favorites-dishes v-if="user.id" :user="user"></user-favorites-dishes>
  </div>
</template>

<script>
import UserOrdersList from "@/components/Administrateur/UserOrdersList.vue";
import UserFavoritesDishes from "@/components/Administrateur/UserFavoritesDishes.vue";
import UserProfile from "@/components/Administrateur/UserProfile.vue";
export default {
  components: {
    UserOrdersList,
    UserProfile,
    UserFavoritesDishes
  },
  data() {
    return {
      user: {},
      loading: true
    };
  },

  async mounted() {
    this.loading = true;
    await this.getUser(this.$route.params.id);
    this.loading = false;
  },
  methods: {
    async getUser(id) {
      await this.$http
        .get("http://localhost:3000/api/users/" + id)
        .then(response => {
          this.user = response.data;
        });
    }
  }
};
</script>

<style>
</style>