<script setup lang="ts">
import { NotificationsBar } from '@/entities/notifications';
import { RouterView } from 'vue-router'
</script>

<template>
  <router-view />
  <notifications-bar />
</template>

<style scoped lang="scss"></style>
