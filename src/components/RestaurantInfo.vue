<template>
  <div>
    <v-container>
      <v-row align="center" class="mx-0" justify="center">
        <v-col sm="12" md="6" xl="6" class="d-flex justify-center" style="overflow:hidden">
          <v-img
            max-width="500"
            :src="restaurant.image ? 'http://localhost:3000/images/products/' + restaurant.image.filePath : 'https://source.unsplash.com/random' "
          ></v-img>
        </v-col>

        <v-col xl="6" cols="12" lg="6">
          <v-row class="text-sm-center text-lg-left">
            <v-col cols="12" xl="12" sm="6">
              <h2 class="font-weight-black">{{restaurant.libelle}}</h2>
            </v-col>
            <v-col xl="12" sm="6" cols="12">
              <v-rating
                :value="restaurant.rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
            </v-col>
            <v-col md="6" xl="12" cols="4">
              <h5>{{restaurant.type.type}}</h5>
            </v-col>
            <v-col md="6" xl="12" cols="8">
              <h5>Adresse : {{restaurant.adresse}}</h5>
            </v-col>
            <v-col sm="12" cols="12">
              <p>{{restaurant.description}}</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["restaurant"]

  //   mounted() {
  //     this.getRestaurantWithId(this.$route.params.id);
  //   },
  //   methods: {
  //     getRestaurantWithId(id) {
  //       this.$http
  //         .get("http://localhost:3000/api/restaurants/" + id)
  //         .then(response => {
  //           this.restaurant = response.data;
  //         });
  //     }
  //   }
};
</script>

<style>
</style>