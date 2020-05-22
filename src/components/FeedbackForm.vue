<template>
  <v-container>
    <h2>Leave a message ?</h2>
    <v-form ref="feedbackForm" v-model="valid">
      <v-row>
        <v-col cols="12">
          <v-rating background-color="primary" color="amber" v-model="feedbackRating" large></v-rating>
        </v-col>

        <v-col cols="12">
          <v-textarea
            color="primary"
            label="Message"
            v-model="feedbackDescription"
            :rules="[v => !!v || 'A message is required']"
          >
            <template v-slot:label>
              <div>Message</div>
            </template>
          </v-textarea>
        </v-col>
      </v-row>
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        :loading="loadingPost"
        @click="validate"
      >Send Review</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  props: ["restaurant"],
  data() {
    return {
      valid: true,
      loadingPost: false,
      feedbackDescription: null,
      feedbackRating: 4
    };
  },
  methods: {
    validate() {
      if (this.$refs.feedbackForm.validate()) {
        this.send();
      }
    },
    async send() {
      this.loadingPost = true;
      let data = {
        rating: this.feedbackRating,
        message: this.feedbackDescription,
        restaurant: this.restaurant["@id"]
      };
      await this.$http
        .post("http://localhost:3000/api/feedback", data)
        .then()
        .catch(err => console.log(err));
      await this.$parent.getRestaurantWithId(this.$route.params.id);
      (this.loadingPost = false),
        this.$store.dispatch(
          "notifications/addNotification",
          {
            type: "success",
            message: "Your Feedback has been saved"
          },
          { root: true }
        );
    }
  }
};
</script>

<style>
</style>