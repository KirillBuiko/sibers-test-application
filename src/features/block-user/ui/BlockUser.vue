<script setup lang="ts">
import type { Channel_O } from "@/entities/channel";
import { useBlockUser } from "../api";
// import "./style.scss"

const props = defineProps<{
    channel: Channel_O,
    userId: number
}>()

const actions = useBlockUser();

function onClick() {
    actions.blockUser(props.channel, props.userId);
}
</script>

<template>
    <v-btn icon="mdi-cancel"
           variant="plain"
           @click="onClick"
           density="compact" />
</template>