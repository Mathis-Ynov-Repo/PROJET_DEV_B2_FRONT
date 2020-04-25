<template>
  <v-col cols="12" md="6" lg="4" xl="3">
    <v-card class="mx-auto my-12" max-width="374">
      <v-img
        height="250"
        lazy-src="/images/logo.jpg"
        :src="restaurant.image ? 'http://localhost:3000/images/products/' + restaurant.image.filePath : 'https://source.unsplash.com/random' "
      ></v-img>
      <v-card-title>{{restaurant.libelle}}</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="restaurant.rating"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ml-4">{{restaurant.rating}} (413)</div>
        </v-row>

        <div class="my-4 subtitle-1">$ • {{restaurant.type.type}}</div>

        <div>{{restaurant.description}}</div>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn router :to="'/restaurants/'+restaurant.id" color="deep-purple lighten-2" text>Visiter</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: ["restaurant"],
  data: () => ({
    isActive: false
  })
};
</script>

<style>
</style>