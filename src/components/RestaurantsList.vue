<template>
  <section id="restaurants_list" class="secondary">
  <v-container class="secondary">
    <v-row
      class="mb-6 flex-row"
      no-gutters
      v-if="restaurants.length == 0">
      <v-col
        cols="12"
        md="6"
        lg="4"
        xl="3"
        v-for="n in 8"
        :key="n">
        <v-skeleton-loader
          class="mx-auto my-12"
          max-width="374"
          v-if="restaurants.length == 0"
          type="image,list-item-two-line, article, actions"
        ></v-skeleton-loader>
    
      </v-col>
    
    </v-row>
    <v-row
      class="mb-6 flex-row"
      no-gutters
      >
      <Restaurant v-for="restaurant in restaurants" :key="restaurant.id" :restaurant="restaurant"/>
    </v-row>
  </v-container>
  </section>

</template>

<script>
import { mapState , mapActions}from 'vuex'
import Restaurant from './Restaurant'
export default {
    data() {
      return {
        loading : true
      }

    },
    components: {
      Restaurant
    },
    computed: {
      ...mapState("restaurant", ['restaurants']),
  },
  mounted() {
      this.getRestaurants()
  },
  methods: {
    ...mapActions("restaurant", ["getRestaurants"])
  }
}
</script>

<style>

</style>