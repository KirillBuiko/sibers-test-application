<script setup lang="ts">
import type { Channel_O } from "../model";
import "./style.scss"

const props = defineProps<{
    channel: Channel_O,
    isOwner: boolean
}>()
</script>

<template>
    <div class="channel">
        <div class="channel__title">
            {{ props.channel.name }}
        </div>
        <div class="channel__owner-mark"
             v-if="isOwner">
            <v-icon icon="mdi-star-outline" />
            Owner
        </div>
    </div>
</template>