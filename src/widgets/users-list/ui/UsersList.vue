<script setup lang="ts">
import type { Channel_O } from "@/entities/channel";
import { useUser, type User_O } from "@/entities/user-e";
// import "./style.scss"
import UserItem from "@/entities/user-e/ui/UserItem.vue";
import { BlockUser } from "@/features/block-user";

const props = defineProps<{
    channel?: Channel_O,
    users: User_O[]
}>()

const user = useUser();

</script>

<template>
    <v-list density="compact">
        <v-list-item v-for="u in props.users"
                     :key="u.id">
            <user-item :user="u">
                <template v-if="props.channel && props.channel.owner == user.getUserId()"
                          #actions>
                    <block-user :channel="props.channel"
                                :user-id="u.id" />
                </template>
            </user-item>
        </v-list-item>
    </v-list>
</template>