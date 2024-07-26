<script setup lang="ts">
import { computed } from "vue";
// import "./style.scss";
import { useRouter } from "vue-router";
import { useChannelActions } from "../api";
import type { Channel_O } from "@/entities/channel";

const props = defineProps<{
    type: "open" | "subscribe-open" | "unsubscribe",
    channel: Channel_O,
    userId: number
}>()

const router = useRouter();
const actions = useChannelActions();

const btnText = computed(() => {
    if (props.type == "open") {
        return "Open";
    } else if (props.type == "subscribe-open") {
        return "Subscribe & Open";
    } else if (props.type == "unsubscribe") {
        return "Unsubscribe";
    }
    return "";
})

async function onClick() {
    if (props.type == "open") {
        onOpen();
    } else if (props.type == "subscribe-open") {
        await onSubscribe();
        onOpen();
    } else if (props.type == "unsubscribe") {
        await onUnsubscribe();
    }
}

function onOpen() {
    router.push({ name: "chat", params: { id: props.channel.id } })
}

function onSubscribe() {
    return actions.subscribe(props.channel, {
        channel: props.channel.id,
        user: props.userId
    });
}

function onUnsubscribe() {
    return actions.unsubscribe({
        channel: props.channel.id,
        user: props.userId
    })
}

</script>

<template>
    <v-btn class="channel-action"
           @click="onClick"> {{ btnText }} </v-btn>
</template>