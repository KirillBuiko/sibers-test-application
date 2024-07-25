<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
    <router-link :to="{ name: 'channels' }">
        <v-btn icon="mdi-keyboard-backspace" variant="outlined" base-color="black" density="comfortable"></v-btn>
    </router-link>
</template>