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
            :subtitle="props.user.username"
            density="compact">
        <template #append>
            <v-btn density="comfortable"
                   icon="mdi-one-up" />
        </template>
    </v-card>
</template>