<script setup lang="ts">
import "./style.scss"
import type { Channel_O } from "@/entities/channel";
import ChannelItem from "@/entities/channel/ui/ChannelItem.vue";

const props = defineProps<{
    channels: Channel_O[],
    subscribedChannels: number[],
    userId: number
}>()
</script>

<template>
    <div class="channels-list">
        <channel-item class="channels-list__item"
                      v-for="m in props.channels"
                      :key="m.id"
                      :channel="m"
                      :is-owner="m.owner == props.userId" />
    </div>
</template>