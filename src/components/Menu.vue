<template>
  <v-col cols="12" md="6" lg="4" xl="3">
    <v-card class="mx-auto my-12" max-width="374">
      <v-card-title>{{menu.libelle}}</v-card-title>

      <v-card-title class="grey--text py-0">{{menu.prix}} $</v-card-title>
      <v-list>
        <v-list-item v-for="detail in menu.menuDetails" :key="detail.plat.id">
          <v-list-item-avatar>
            <v-img
              :src="detail.plat.image ? 'http://localhost:3000/images/products/' + detail.plat.image.filePath : 'https://source.unsplash.com/random' "
            ></v-img>
          </v-list-item-avatar>
          {{detail.plat.libelle}} ({{detail.plat.prix}}$)
        </v-list-item>
      </v-list>
      <v-card-actions class="justify-center">
        <MenuDetails :menu="menu" />
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import MenuDetails from "./MenuDetails";

export default {
  components: {
    MenuDetails
  },
  props: ["menu"]
};
</script>

<style>
</style>