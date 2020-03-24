<template>
  <div class="home">
    <h1>homepâge</h1>
    <v-btn class="pink white--text">CLICK ME</v-btn>
    <v-btn depressed class="pink hidden-md-and-down"> Pelo </v-btn>
    <v-btn
      color="purple"
      small
      fab
    >
    <v-icon >mdi-heart</v-icon>
    </v-btn>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>
