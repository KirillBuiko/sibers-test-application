import type { Channel } from "@/entities/channel";
import { useMessageApi, type Message } from "@/entities/message";
import { useUserApi, type User } from "@/entities/user";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { FETCH_MESSAGES_LIMIT } from "../config";
import { useSubscribeApi } from "@/entities/subscribe/api/subscribe-api";
import _ from "lodash";

export type UserByKey = { [ind: number]: User }

export const useChatContext = defineStore("chat-context", () => {
    const messages: Ref<Message[]> = ref([]);
    const allUsers: Ref<UserByKey> = ref({});
    const subscribed: Ref<number[]> = ref([]);
    const channel: Ref<Channel | undefined> = ref(undefined);

    const messageApi = useMessageApi();
    const userApi = useUserApi();
    const subscribeApi = useSubscribeApi();

    async function setChannel(id: number) {
        channel.value = {
            blackList: [],
            id: id,
            name: "Chat 1",
            owner: 4
        };
        // await updateChannel();
        await updateMessages();
        await updateSubscribed();
        await updateUsers();
    }

    async function updateMessages() {
        if (!channel.value) return;
        messages.value = await messageApi.fetchMessagesByChannel({
            key: channel.value.name,
            direction: "prev",
            limit: FETCH_MESSAGES_LIMIT
        })
    }

    async function updateUsers() {
        if (!channel.value) return;
        const userKeys = _.uniq([...messages.value.map(message => message.user)]);
        allUsers.value = (await userApi.fetchUsersByIds(userKeys));
    }

    async function updateSubscribed() {
        if (!channel.value) return;
        subscribed.value = (await subscribeApi.fetchChannelUsers(channel.value.id)).map(sub => sub.id);
    }

    return { setChannel, updateMessages, updateUsers, updateSubscribed }
});