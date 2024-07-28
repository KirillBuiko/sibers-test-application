<script setup lang="ts">
import { NotificationsBar } from '@/entities/notification';
import { RouterView } from 'vue-router'
</script>

<template>
  <router-view />
  <notifications-bar />
</template>

<style scoped lang="scss"></style>
