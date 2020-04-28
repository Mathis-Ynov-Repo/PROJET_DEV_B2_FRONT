<template>
  <div>Le resto {{restaurant.libelle}}</div>
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