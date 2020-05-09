<template>
  <div class="home">
    <v-parallax dark src="/images/mike-dorner-sf_1ZDA1YFw-unsplash.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">Welcome</h1>
          <h4 class="subheading">Start ordering now!</h4>
        </v-col>
      </v-row>
    </v-parallax>
    <home-restaurant></home-restaurant>
  </div>
</template>

<script>
import HomeRestaurant from "@/components/HomeRestaurants.vue";
export default {
  name: "Home",
  components: {
    HomeRestaurant
  }
};
</script>
