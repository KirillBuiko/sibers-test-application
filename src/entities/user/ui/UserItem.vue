<script setup lang="ts">
import type { User_O } from "../model";
// import "./style.scss"
const props = defineProps<{
    user: User_O
}>()
</script>

<template>
    <v-card :prepend-avatar="props.user.avatar"
            :title="user.name"
            :subtitle="props.user.email"
            density="compact">
        <template #append>
            <slot name="actions" />
        </template>
    </v-card>
</template>