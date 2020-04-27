<template>
  <v-card class="mx-auto" max-width="600" shaped>
    <v-list-item two-line class="text-center secondary">
      <v-list-item-avatar size="80" class="elevation-6" :color="color">
        <v-icon x-large class="white--text">{{icon}}</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{domain}}</v-list-item-title>
        <v-list-item-subtitle class="subtitle-1">{{data}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: ["data", "domain", "icon", "color"]
};
</script>

<style>
</style>