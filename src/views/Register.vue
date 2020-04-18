<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="name" :rules="[v => !!v || 'Un nom est requis']" label="Nom" required></v-text-field>

    <v-text-field
      v-model="surname"
      :rules="[v => !!v || 'Un prénom est requis']"
      label="Prénom"
      required
    ></v-text-field>

    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'"
      label="Entrez votre mot de passe"
      class="input-group--focused"
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-text-field
      v-model="password_confirmation"
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, passwordMatch]"
      :type="show2 ? 'text' : 'password'"
      label="Confirmez le mot de passe"
      class="input-group--focused"
      @click:append="show2 = !show2"
    ></v-text-field>

    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Ce champ est requis']"
      label="Je souhaite utiliser l'application en tant que"
      item-disabled="customDisabled"
      required
    ></v-select>

    <v-card v-if="select == 'ROLE_RESTAURATEUR'">
      <v-card-title>
        <span class="headline">Entrez les informations de votre restaurant</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="restaurantTitle"
                :rules="[v => !!v || 'Un libelle est requis']"
                label="Libelle du restaurant*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="restaurantAdress"
                :rules="[v => !!v || 'Une adresse est requise']"
                label="Adresse*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="restaurantSelect"
                :items="types"
                item-text="type"
                item-value="@id"
                :rules="[v => !!v || 'Ce champ est requis']"
                label="Type de votre restaurant*"
                required
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea color="teal" v-model="restaurantDescription">
                <template v-slot:label>
                  <div>
                    Description
                    <small>(optional)</small>
                  </div>
                </template>
              </v-textarea>
            </v-col>
          </v-row>
        </v-container>

        <small>*indicates required field</small>
      </v-card-text>
    </v-card>
    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Accept terms and conditions"
      required
    ></v-checkbox>
    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>

    <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
    <!-- <v-dialog
      v-if="select == 'ROLE_RESTAURATEUR'"
      v-model="dialog"
      persistent
      :rules="[v => !!v || 'Un libelle est requis']"
      max-width="600px"
      required
    >
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Votre restaurant</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Entrez les informations</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="restaurantTitle"
                  :rules="[v => !!v || 'Un libelle est requis']"
                  label="Libelle du restaurant*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="restaurantAdress"
                  :rules="[v => !!v || 'Une adresse est requise']"
                  label="Adresse*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="restaurantSelect"
                  :items="types"
                  :rules="[v => !!v || 'Ce champ est requis']"
                  label="Type de votre restaurant*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea color="teal" v-model="restaurantDescription">
                  <template v-slot:label>
                    <div>
                      Description
                      <small>(optional)</small>
                    </div>
                  </template>
                </v-textarea>
              </v-col>
            </v-row>
          </v-container>

          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="validateRestaurant()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>-->
  </v-form>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    valid: true,
    name: "",
    types: [],
    dialog: false,
    restaurantAdress: "",
    restaurantSelect: null,
    restaurantDescription: "",
    surname: "",
    restaurantTitle: "",
    email: "",
    emailRules: [
      v => !!v || "Une adresse mail est requise",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    checkbox: false,
    password: "",
    password_confirmation: "",
    rules: {
      required: value => !!value || "Requis.",
      min: v => v.length >= 8 || "Min 8 caractères"
    },
    show1: true,
    show2: false,
    select: null,
    items: [
      { text: "Client", value: "ROLE_USER" },
      { text: "Restaurateur", value: "ROLE_RESTAURATEUR" },
      {
        text: "Livreur (Coming soon)",
        value: "ROLE_LIVREUR",
        customDisabled: true
      }
    ]
  }),

  created() {
    this.$http
      .get("http://localhost:3000/api/restaurant_types")
      .then(response => (this.types = response.data["hydra:member"]));
  },

  computed: {
    ...mapState("authentication", ["user"]),
    passwordMatch() {
      return () =>
        this.password === this.password_confirmation || "Passwords must match";
    }
  },

  methods: {
    ...mapActions("restaurant", ["createRestaurant"]),
    validate() {
      if (this.$refs.form.validate()) {
        this.register();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    async register() {
      if (this.select === "ROLE_RESTAURATEUR") {
        let data = {
          surname: this.surname,
          name: this.name,
          email: this.email,
          password: this.password,
          roles: [this.select]
        };
        await this.$store
          .dispatch("authentication/register", data)
          .then(() => this.$router.push("/"))
          .catch(err => console.log(err));

        let restaurant = {
          adresse: this.restaurantAdress,
          libelle: this.restaurantTitle,
          description: this.restaurantDescription,
          type: this.restaurantSelect
        };
        this.createRestaurant(restaurant);
      } else {
        let user = {
          surname: this.surname,
          name: this.name,
          email: this.email,
          password: this.password,
          roles: [this.select]
        };
        this.$store
          .dispatch("authentication/register", user)
          .then(() => this.$router.push("/"))
          .catch(err => console.log(err));
      }
    }
  }
};
</script>