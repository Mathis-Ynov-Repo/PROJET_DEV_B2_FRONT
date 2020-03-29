<template>
  <div class="plats">
    <h1 class="lead-title text-center">Nos Restaurants</h1>
    <section class="container-fluid d-flex flex-row filter-sort-container">
        <form class="row row-cols-2">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                <label class="form-check-label" for="defaultCheck1">
                  Filtre 1
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck2">
                <label class="form-check-label" for="defaultCheck2">
                  Filtre 2
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck3">
                <label class="form-check-label" for="defaultCheck3">
                  Filtre 3
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck4">
                <label class="form-check-label" for="defaultCheck4">
                  Filtre 4
                </label>
            </div>
        </form>
        <div class="d-flex p-2 bd-highlight justify-content-center">
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
        </div>
    </section>
    <section class="container">
        <div class="search-group">
            <input class="search-input" placeholder="Recherche">
            <button class="btn btn-primary search-button" type="submit">
                <i class="fas fa-search"></i>
            </button>
        </div>
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
      
        v-for="restaurant in restaurants"
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
  <!-- <v-row
      class="mb-6"
      v-else
      no-gutters
    >
      <v-col
      cols="12"
      md="6"
      lg="4"
      xl="3"
      
      >
      <v-skeleton-loader
      class="mx-auto my-12"
      max-width="374"
      type="image,list-item-two-line, article, actions"
    ></v-skeleton-loader>
    <v-skeleton-loader
      class="mx-auto my-12"
      max-width="374"
      type="image,list-item-two-line, article, actions"
    ></v-skeleton-loader>
    <v-skeleton-loader
      class="mx-auto my-12"
      max-width="374"
      type="image,list-item-two-line, article, actions"
    ></v-skeleton-loader>
      </v-col>
      </v-row> -->
  </section>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      restaurants : [],
      loading: true,
      transition: 'fade-transition',
      transitions: [
        {
          text: 'None',
          value: undefined,
        },
        {
          text: 'Fade Transition',
          value: 'fade-transition',
        },
        {
          text: 'Scale Transition',
          value: 'scale-transition',
        },
      ],
    }
  },
  async created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      this.loading = true;
      await this.getRestaurants();
      this.loading = false;
    },

    async getRestaurants() {
      await Axios.get('http://localhost:8000/api/restaurants')
      .then(response => this.restaurants = response.data);
    }
  }
}
</script>

<style>

</style>
