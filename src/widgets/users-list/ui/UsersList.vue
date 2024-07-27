<script setup lang="ts">
import type { User_O } from "@/entities/user";
// import "./style.scss"
import UserItem from "@/entities/user/ui/UserItem.vue";
const props = defineProps<{
    users: User_O[]
}>()

</script>

<template>
    <v-list density="compact">
        <v-list-item v-for="user in props.users"
                     :key="user.id">
            <user-item :user="user" />
        </v-list-item>
    </v-list>
</template>