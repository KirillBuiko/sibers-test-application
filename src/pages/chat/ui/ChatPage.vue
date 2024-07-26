<script setup lang="ts">
import "./style.scss"
import { PageHeader } from "@/widgets/page-header";
import { MessagesList } from "@/widgets/messages-list";
import { SendMessage } from "@/features/send-message";
import { HrSeparator } from "@/shared/ui/hr-separator";
import { useChatContext } from "../model";
import { useUser } from "@/entities/user";
import { useBroadcastApi } from "@/shared/api/broadcast";
import { onMounted, ref, watch, type VNode } from "vue";

const context = useChatContext();
const user = useUser();
const broadcastApi = useBroadcastApi();
const listRef = ref<VNode | null>(null);

broadcastApi.on("message", async (value) => {
    if (value.inChannel != context.channel?.id) return;
    const h = watch(context, () => {
        moveChatDown();
        h();
    })
});

onMounted(() => {
    moveChatDown();
})

function moveChatDown() {
    if (listRef.value) {
        // @ts-ignore
        listRef.value.goToStart();
    }
}
</script>

<template>
    <div class="chat-page">
        <header class="chat-page__header">
            <page-header>
                {{ context.channel?.name }}
            </page-header>
            <div class="chat-page__users-button">
                <v-btn prepend-icon="mdi-account-group"
                       variant="plain">{{ context.subscribed.length }} users</v-btn>
            </div>
        </header>
        <hr-separator />
        <main class="chat-page__body">
            <messages-list :messages="context.messages"
                           :users="context.users"
                           :user-id="user.getUserId() || -1"
                           ref="listRef" />
            <send-message :channel-id="context.channel?.id || -1"
                          :user-id="user.getUserId() || -1" />
        </main>
    </div>
</template>
