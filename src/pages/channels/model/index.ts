import { useChannelApi, type Channel_I, type Channel_O } from "@/entities/channel";
import { defineStore } from "pinia";
import { ref } from "vue";
import { FETCH_CHANNELS_LIMIT } from "../config";
import { useUser } from "@/entities/user";
import { useSubscribeApi } from "@/entities/subscribe/api/subscribe-api";

export const useChannelsContext = defineStore("channels-context", () => {
    const channels = ref<Channel_O[]>([]);
    const subscribedChannels = ref<number[]>([]);

    const channelApi = useChannelApi();
    const subscribeApi = useSubscribeApi();
    const user = useUser();

    async function init() {
        await updateChannels();
        console.log("CH", channels.value);
        await updateSubscribes();
    }

    async function updateChannels() {
        channels.value = await channelApi.fetchChannels({
            direction: "prev",
            limit: FETCH_CHANNELS_LIMIT
        })
    }

    async function updateSubscribes() {
        subscribedChannels.value =
            (await subscribeApi.fetchUserChannels(user.getUserId())).map(sub => sub.channel);
    }

    async function createChannel(channel: Channel_I) {
        const id = await channelApi.createChannel(channel);
        await subscribeApi.subscribe({
            user: channel.owner,
            channel: id
        })
        return id;
    }

    return { channels, subscribedChannels, init, updateChannels, updateSubscribes, createChannel }
});