<script setup lang="ts">
import { ChannelsList } from "@/widgets/channels-list";
import { PageHeader } from "@/widgets/page-header";
import { HrSeparator } from "@/shared/ui/hr-separator";
import "./style.scss"
import { useChannelsContext } from "../model";
import { useUser } from "@/entities/user";

const context = useChannelsContext();
const user = useUser();

</script>

<template>
    <div class="channels-page">
        <header class="channels-page__header">
            <page-header :back-active="false">
                Channels
            </page-header>
        </header>
        <hr-separator />
        <main class="channels-page__body">
            <channels-list :channels="context.channels"
                           :user-id="user.getUserId()"
                           :subscribed-channels="context.subscribedChannels" />
        </main>
    </div>
</template>
