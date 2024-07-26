<script setup lang="ts">
import "./style.scss"
import type { Channel_O } from "@/entities/channel";
import ChannelItem from "@/entities/channel/ui/ChannelItem.vue";
import { ChannelAction } from "@/features/channel-action";

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
                      :is-owner="m.owner == props.userId">
            <template #actions>
                <template v-if="props.subscribedChannels.includes(m.id)">
                    <channel-action type="open"
                                    :channel="m"
                                    :user-id="userId" />
                    <channel-action type="unsubscribe"
                                    :channel="m"
                                    :user-id="userId" />
                </template>
                <template v-else>
                    <channel-action type="subscribe-open"
                                    :channel="m"
                                    :user-id="userId" />
                </template>
            </template>
        </channel-item>
    </div>
</template>