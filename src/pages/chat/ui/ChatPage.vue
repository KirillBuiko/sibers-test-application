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
import PageContainer from "@/shared/ui/layouts/page-container/PageContainer.vue";
import { UsersList } from "@/widgets/users-list";
import { useNotifications } from "@/entities/notification";
import { useRouter } from "vue-router";

const context = useChatContext();
const user = useUser();
const broadcastApi = useBroadcastApi();
const notifications = useNotifications();
const router = useRouter();
const listRef = ref<VNode | null>(null);

broadcastApi.on("message", async (value) => {
    if (value.inChannel != context.channel?.id) return;
    const h = watch(context, () => {
        moveChatDown();
        h();
    })
});

broadcastApi.on("user-block", async (value) => {
    if (user.getUserId() == value.user && context.channel?.id === value.channel) {
        notifications.openNotification(`You're blocked in channel "${context.channel.name}"`);
        router.push({ name: "channels" });
    }
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
    <page-container>
        <div class="chat-page"
             v-if="context.channel">
            <header class="chat-page__header">
                <page-header>
                    {{ context.channel?.name }}
                </page-header>
                <div class="chat-page__users-button">
                    <!-- TODO: Move menu to widgets -->
                    <v-menu :close-on-content-click="false"
                            location="right bottom"
                            origin="right top">
                        <template v-slot:activator="{ props }">
                            <v-btn prepend-icon="mdi-account-group"
                                   variant="plain"
                                   v-bind="props">{{ context.subscribed.length }} users</v-btn>
                        </template>
                        <users-list :users="context.subscribedUsers"
                                    :channel="context.channel" />
                    </v-menu>
                </div>
            </header>
            <hr-separator />
            <main class="chat-page__body">
                <messages-list :messages="context.messages"
                               :users="context.messageUsers"
                               :user-id="user.getUserId() || -1"
                               ref="listRef" />
                <send-message :channel-id="context.channel.id || -1"
                              :user-id="user.getUserId() || -1" />
            </main>
        </div>
    </page-container>
</template>
