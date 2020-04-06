<template>
    <div class="notifications-list">
        <notification-message v-for="notification in notifications" 
        :key="notification.id" 
        :notification ="notification">
        </notification-message> 
    </div>
</template>

<script>
import NotificationMessage from "./NotificationMessage";
import { mapState } from "vuex";
export default {
    components: {
        NotificationMessage
    },
    data () {
      return {
        snackbar: true,
        y: 'top',
        x: null,
        mode: '',
        timeout: 6000,
        text: 'Hello, I\'m a snackbar'
      }
    },
    computed: mapState("notifications", ["notifications"])

}
</script>

<style>
.notifications-list {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 15px;
    width: 320px;
}

</style>