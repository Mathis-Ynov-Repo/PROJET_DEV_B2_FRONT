<template>
  <v-container id="mennus_list" class="secondary my-5">
    <h1>Menus</h1>
    <v-row class="mb-6 flex-row" no-gutters>
      <Menu v-for="menu in menus" :key="menu.id" :menu="menu" />
    </v-row>
    <h2 v-if="menus.length == 0">No menus available in this restaurant</h2>
  </v-container>
</template>

<script>
import Menu from "./Menu";
export default {
  props: ["menus"],

  data() {
    return {
      loading: true
    };
  },

  components: {
    Menu
  }
};
</script>

<style>
</style>