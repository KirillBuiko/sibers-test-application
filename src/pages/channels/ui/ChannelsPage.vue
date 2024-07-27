<script setup lang="ts">
import { ChannelsList } from "@/widgets/channels-list";
import { PageHeader } from "@/widgets/page-header";
import { HrSeparator } from "@/shared/ui/hr-separator";
import "./style.scss"
import { useChannelsContext } from "../model";
import { useUser } from "@/entities/user";
import { useRouter } from "vue-router";
import { useBroadcastApi } from "@/shared/api/broadcast";
import { ref } from "vue";
import PageContainer from "@/shared/ui/layouts/page-container/PageContainer.vue";

const context = useChannelsContext();
const broadcast = useBroadcastApi();
const user = useUser();
const router = useRouter();

const createChannelOpen = ref(false);
const channelName = ref("");

function onLogout() {
    user.logout();
    router.push({ name: "login" })
}

async function onChannelCreate() {
    await context.createChannel({
        blacklist: [],
        name: channelName.value,
        owner: user.getUserId()
    })
    closeCreateChannel();
}

function closeCreateChannel() {
    createChannelOpen.value = false;
    channelName.value = "";
}

broadcast.on("channel", () => {
    context.init();
})

</script>

<template>
    <page-container>
        <div class="channels-page">
            <header class="channels-page__header">
                <page-header :back-active="false">
                    Channels
                </page-header>
                <!-- TODO: Move menu and dialog to widgets -->
                <v-menu :close-on-content-click="false"
                        location="right bottom"
                        origin="right top">
                    <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-menu"
                               v-bind="props"
                               variant="plain"
                               density="compact"
                               :ripple="false"></v-btn>
                    </template>
                    <v-list>
                        <v-list-item prepend-icon="mdi-forum"
                                     slim
                                     @click="createChannelOpen = !createChannelOpen">Create
                            channel</v-list-item>
                        <v-divider />
                        <v-list-item prepend-icon="mdi-logout"
                                     slim
                                     @click="onLogout">Logout</v-list-item>
                    </v-list>
                </v-menu>
            </header>
            <hr-separator />
            <main class="channels-page__body">
                <channels-list :channels="context.channels"
                               :user-id="user.getUserId()"
                               :subscribed-channels="context.subscribedChannels" />
            </main>
        </div>

        <v-dialog max-width="500"
                  v-model="createChannelOpen">
            <v-card title="Create channel">
                <v-card-text>
                    Enter name of your new channel.
                </v-card-text>
                <v-card-item>
                    <v-text-field v-model="channelName"
                                  placeholder="Channel name"
                                  density="comfortable" />
                </v-card-item>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Create"
                           variant="outlined"
                           @click="onChannelCreate()" />
                    <v-btn text="Cancel"
                           @click="closeCreateChannel()" />
                </v-card-actions>
            </v-card>
        </v-dialog>
    </page-container>
</template>
