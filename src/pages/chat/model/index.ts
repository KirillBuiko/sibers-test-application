import { useChannelApi, type Channel_O } from "@/entities/channel";
import { useMessageApi, type Message_O } from "@/entities/message";
import { useUserApi, type User_O } from "@/entities/user-e";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { FETCH_MESSAGES_LIMIT } from "../config";
import { useSubscribeApi } from "@/entities/subscribe/api/subscribe-api";
import _ from "lodash";
import { useBroadcastApi } from "@/shared/api/broadcast";

export type UserByKey = { [ind: number]: User_O }

/** Chat page context store. Used for data fetch and store. */
export const useChatContext = defineStore("chat-context", () => {
    const messages: Ref<Message_O[]> = ref([]);
    const messageUsers: Ref<UserByKey> = ref({});
    const subscribedUsers: Ref<User_O[]> = ref([]);
    const subscribedIds: Ref<number[]> = ref([]);
    const channel: Ref<Channel_O | undefined> = ref(undefined);

    const channelApi = useChannelApi();
    const messageApi = useMessageApi();
    const userApi = useUserApi();
    const subscribeApi = useSubscribeApi();
    const broadcastApi = useBroadcastApi();

    broadcastApi.on("message", async (value) => {
        if (value.inChannel == channel.value?.id) {
            await updateMessages();
            await updateUsers();
        }
    })

    broadcastApi.on("channel", async (value) => {
        if (value.channel == channel.value?.id) {
            await updateSubscribed();
            await updateUsers();
        }
    })

    async function setChannel(id: number) {
        await updateChannel(id);
        await updateMessages();
        await updateSubscribed();
        await updateUsers();
    }

    async function updateChannel(id: number) {
        channel.value = await channelApi.fetchChannelById(id);
    }

    async function updateMessages() {
        if (!channel.value) return;
        messages.value = await messageApi.fetchMessagesByChannel({
            key: channel.value.id,
            limit: FETCH_MESSAGES_LIMIT
        })
    }

    async function updateUsers() {
        if (!channel.value) return;
        const userKeys = _.uniq([...messages.value.map(message => message.user)]);
        messageUsers.value = _.chain(await userApi.fetchUsersByIds(userKeys))
            .compact().keyBy("id").value();
    }

    async function updateSubscribed() {
        if (!channel.value) return;
        subscribedIds.value = (await subscribeApi.fetchChannelUsers(channel.value.id)).map(sub => sub.user);
        subscribedUsers.value = (await userApi.fetchUsersByIds(subscribedIds.value)).filter(user => user).reverse();
    }

    return {
        messages, messageUsers, subscribedUsers: subscribedUsers, subscribedIds, channel,
        setChannel, updateMessages, updateUsers, updateSubscribed
    }
});