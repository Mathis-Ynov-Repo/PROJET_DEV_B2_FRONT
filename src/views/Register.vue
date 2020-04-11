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
      required
    ></v-select>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>

    <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
  </v-form>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    surname: "",
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
    items: ["Client", "Restaurateur", "Livreur"]
  }),

  computed: {
    passwordMatch() {
      return () =>
        this.password === this.password_confirmation || "Passwords must match";
    }
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.register();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    register() {
      let data = {
        surname: this.surname,
        name: this.name,
        email: this.email,
        password: this.password,
        roles: ["ROLE_" + this.select.toUpperCase()]
      };
      this.$store
        .dispatch("authentication/register", data)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>