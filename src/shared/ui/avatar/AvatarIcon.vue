<script setup lang="ts">
import "./style.scss";

const props = defineProps<{
    imageLink: string
}>();
</script>

<template>
    <img src="props.imageLink"
         alt="Avatar icon">
</template>