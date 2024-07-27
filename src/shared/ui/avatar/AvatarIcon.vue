<script setup lang="ts">
import "./style.scss";

const props = defineProps<{
    imageLink: string
}>();
</script>

<template>
    <v-avatar :image="props.imageLink"
              alt="Avatar icon"
              class="avatar"
              size="35" />
</template>