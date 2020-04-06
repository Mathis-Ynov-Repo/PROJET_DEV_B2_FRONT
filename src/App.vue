<template>
  <v-app>
    <Navbar />
    <v-content class="mx-4">
      <router-view></router-view>
    </v-content>

    <notifications-list />

  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar';
import NotificationsList from "@/components/NotificationsList"

export default {
  name: 'App',

  components: {
    Navbar,
    NotificationsList
  },

  data: () => ({
    //
  }),
};
</script>
