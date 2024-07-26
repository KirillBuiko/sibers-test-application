<script setup lang="ts">
import type { Channel_O } from "../model";
import "./style.scss"

const props = defineProps<{
    channel: Channel_O,
    isOwner: boolean
}>()
</script>

<template>
    <div class="channel elevation-3 rounded">
        <div class="channel__title">
            {{ props.channel.name }}
        </div>
        <v-chip class="channel__owner-mark"
                v-if="isOwner">
            <v-icon icon="mdi-star-outline" />
            Owner
        </v-chip>
        <div class="channel__actions">
            <slot name="actions" />
        </div>
    </div>
</template>