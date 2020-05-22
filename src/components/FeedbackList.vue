<template>
  <div id="feedbackContainer">
    <h4 v-if="restaurant.feedback.length > 0" class="text-center">Reviews on this restaurant</h4>
    <h4 v-else>No reviews on this restaurant yet</h4>
    <v-list three-line v-if="restaurant.feedback.length > 0">
      <template v-for="item in restaurant.feedback">
        <v-list-item :key="item.id">
          <v-list-item-avatar color="indigo">
            <v-img
              v-if="item.user.image"
              :src="'http://localhost:3000/images/products/'+item.user.image.filePath"
            ></v-img>
            <v-icon color="secondary" v-else>mdi-account</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.user.name + ' ' + item.user.surname"></v-list-item-title>
            <v-rating
              :value="item.rating"
              color="amber"
              background-color="primary"
              small
              readonly
              dense
            ></v-rating>
            <v-list-item-subtitle v-html="item.message"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  props: ["restaurant"]
};
</script>

<style>
</style>