<template>
  <div class="alert">
        <v-alert
        :value="true"
        border="left"
        transition="scale-transition"
        dismissible
        :type="notification.type"
        >
        {{notification.message}}
        </v-alert>
    </div> 
</template>

<script>
import {mapActions} from "vuex"
export default {
    props: ["notification"],

    data() {
        return {
            timeout: 3000,
        };
    },

    created() {
        this.timeout = setTimeout(() => {
            this.removeNotification(this.notification);
        }, 3000);
    },

    beforeDestroy() {
        clearTimeout(this.timeout);
    },
    methods: mapActions("notifications", ["removeNotification"])
}
</script>

<style>

</style>