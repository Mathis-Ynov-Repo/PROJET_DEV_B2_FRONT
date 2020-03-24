<template>
  <nav>

    <v-app-bar text app color="grey lighten-4">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title >
            <v-img
              src="/images/logo.jpg"
              width="90"
   
            ></v-img>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text color="primary">
            <span>Connexion</span>
            <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
        <v-btn color="primary">
            <span>Inscription</span>
            <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
    </v-app-bar>
          
    <v-navigation-drawer app v-model="drawer" class="accent">
        <v-list>
            <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                <v-list-item-action>
                    <v-icon class="white--text">{{link.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title class="white--text" >{{link.text}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
    data() {
        return  {
            drawer: false,
            links: [
                {icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/'},
                {icon: 'mdi-food-fork-drink', text: 'Plats', route: '/plats'},
                {icon: 'mdi-home-variant', text: 'Restaurants', route: '/restaurants'}
            ]
        }
    }
}
</script>

<style>

</style>