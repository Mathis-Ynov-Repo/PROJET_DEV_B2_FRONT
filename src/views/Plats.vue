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



  <section id="plats_list" class="secondary">
  <v-container class="secondary">
    <v-row
      class="mb-6"
      no-gutters
    >
      <v-col
      cols="12"
      md="6"
      lg="4"
      xl=3
        v-for="plat in plats"
        :key="plat.route"
      >

        <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>{{plat.title}}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="plat.rating"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">{{plat.rating}} (413)</div>
      </v-row>

      <div class="my-4 subtitle-1">
        $ • {{plat.type}}
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>


    <v-card-actions class="justify-center">
      <v-btn 
        router :to="plat.route"
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
export default {
  data() {
    return {
      plats : [
        {title: 'titre1', text: 'LoremZo', route: '/', image: '/images/logo.jpg', rating: '4', type : 'Italien'},
        {title: 'titre2', text: 'LoremZo', route: '/2', image: '/images/logo.jpg', rating: '4', type : 'Italien'},
        {title: 'titre2', text: 'LoremZo', route: '/2', image: '/images/logo.jpg', rating: '2', type : 'Italien'},
        {title: 'titre2', text: 'LoremZo', route: '/2', image: '/images/logo.jpg', rating: '3', type : 'Fast Food'},
        {title: 'titre2', text: 'LoremZo', route: '/2', image: '/images/logo.jpg', rating: '4', type : 'Italien'}
      ]
    }
  }
}
</script>

<style>

</style>
