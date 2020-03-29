<template>
  <div class="plats">

    <h1 class="lead-title text-center">Nos Restaurants</h1>
    <section class="container-fluid d-flex flex-row filter-sort-container">

        <!-- <div class="d-flex p-2 bd-highlight justify-content-center">
            <div class="dropdown">
                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-display="static" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Trie
                </a>
                <div class="dropdown-menu dropdown-menu-right dropdown-menu-md-left" aria-labelledby="dropdownMenuLink">
                  <a class="dropdown-item" href="#">Prix Croissant</a>
                  <a class="dropdown-item" href="#">Prix décroissant</a>
                  <a class="dropdown-item" href="#">Par popularité</a>
                </div>
              </div>
        </div> -->
        <v-select
        :items="types"
        label="Vous recherchez un type de restaurant en particulier ?"
        :loading="loading ? true : false"
        item-text="type"
        item-value="type"
        @change="filterData"
        ></v-select>
        <v-layout row class="mb-3">
          <v-btn small text color="grey" @click="sortByRating()">
            <v-icon left small>mdi-heart</v-icon>
            <span class="caption text-lowercase"> By rating</span>
          </v-btn>
          <v-btn small text color="grey" @click="sortByTitle()">
            <v-icon left small>mdi-format-title</v-icon>
            <span class="caption text-lowercase"> By name</span>
          </v-btn>
        </v-layout>
    </section>




  <section id="restaurants_list" class="secondary">
  <v-container class="secondary">
    <v-row
      class="mb-6 flex-row"
      no-gutters
      v-if="loading">
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
          v-if="loading"
          type="image,list-item-two-line, article, actions"
        ></v-skeleton-loader>
    
      </v-col>
    
    </v-row>
    <v-row
      class="mb-6"
      no-gutters
    >
    
      <v-col
      cols="12"
      md="6"
      lg="4"
      xl="3"
      
        v-for="restaurant in filteredData"
        :key="restaurant.route"
      >
        <v-card
        class="mx-auto my-12"
        max-width="374"
        >
          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>

          <v-card-title>{{restaurant.libelle}}</v-card-title>

          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >
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

            <div class="my-4 subtitle-1">
              $ • {{restaurant.type.type}}
            </div>

            <div>{{restaurant.description}}</div>
          </v-card-text>


          <v-card-actions class="justify-center">
            <v-btn 
              router :to="'/restaurants/'+restaurant.id"
              color="deep-purple lighten-2"
              text
              
            >
              Visiter
            </v-btn>
          </v-card-actions>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
  </section>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      restaurants : [],
      filteredData:[],
      loading: true,
      types : [],
      transition: 'fade-transition',
    }
  },
  watch: {
    months: function (newVal) {
      this.gotoMonth(newVal);
    }
  },
  async created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      this.loading = true;
      await this.getRestaurants();
      await this.getRestaurantsTypes();
      this.filteredData = this.restaurants;
      this.loading = false;
    },

    async getRestaurants() {
      await Axios.get('http://localhost:8001/api/restaurants')
      .then(response => this.restaurants = response.data);
    },
    async getRestaurantsTypes() {
      await Axios.get('http://localhost:8001/api/restaurants-types')
      .then(response => this.types = response.data);
    },

    sortByRating() {
      this.filteredData.sort((a,b) => a.rating > b.rating ? -1 : 1)
    },
    sortByTitle() {
      this.filteredData.sort((a,b) => a.libelle.charAt(0).toUpperCase() < b.libelle.charAt(0).toUpperCase() ? -1 : 1)
    },
    filterData(type) {
      this.filteredData = this.restaurants.filter(function(restaurant){
        return restaurant.type.type.match(type)
      })
    }
  }
}
</script>

<style>

</style>
