<script setup lang="ts">
import { INDEXED_DB_NAME } from "@/shared/config";
import "./style.scss";
import { fillDbWithTestData } from "../lib/fill-db-test-data";
import { ref } from "vue";
import { useSubscribeApi } from "@/entities/subscribe/api/subscribe-api";
import type { Subscribe_O } from "@/entities/subscribe";
import { useMessageApi, type Message_O } from "@/entities/message";
import { useUserApi, type User_O } from "@/entities/user-e";
import PageContainer from "@/shared/ui/layouts/page-container/PageContainer.vue";

const newIds = ref<Awaited<ReturnType<typeof fillDbWithTestData>> | undefined>()
const users = ref<User_O[]>([])
const channelUsers = ref<Subscribe_O[]>([])
const userChannels = ref<Subscribe_O[]>([])
const messages = ref<Message_O[]>([])

function onDbRemove() {
    indexedDB.deleteDatabase(INDEXED_DB_NAME);
}

function onFill() {
    fillDbWithTestData().then(async (res) => {
        newIds.value = res;
        users.value = await useUserApi().fetchUsersByIds(res.users);
        channelUsers.value = await useSubscribeApi().fetchChannelUsers(res.channel);
        userChannels.value = await useSubscribeApi().fetchUserChannels(res.users[0]);
        messages.value = await useMessageApi().fetchMessagesByChannel({
            key: res.channel
        })
    })

}
</script>

<template>
    <page-container>
        <div class="test-page">
            <div class="test-page__buttons">
                <v-btn @click="onDbRemove">REMOVE DB</v-btn>
                <v-btn @click="onFill">FILL DB</v-btn>
            </div>
            <div>
                <h3>Users</h3>
                <div v-for="i in users"
                     :key="i.id">{{ i }}</div>
            </div>
            <div>
                <h3>Ch. users</h3>
                <div v-for="i in channelUsers"
                     :key="i.id">{{ i }}</div>
            </div>

            <div>
                <h3>User channels</h3>
                <div v-for="i in userChannels"
                     :key="i.id">{{ i }}</div>
            </div>

            <div>
                <h3>Messages</h3>
                <div v-for="i in messages"
                     :key="i.id">{{ i }}</div>
            </div>
        </div>
    </page-container>
</template>