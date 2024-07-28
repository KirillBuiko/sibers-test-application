<script setup lang="ts">
import { useNotifications } from "../model";
const notification = useNotifications();

</script>

<template>
    <v-snackbar class="notifications-bar"
                v-model="notification.isOpen">
        {{ notification.notificationText }}
        <template v-slot:actions>
            <v-btn color="pink"
                   variant="text"
                   @click="notification.closeNotification()">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>