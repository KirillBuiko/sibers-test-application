<script setup lang="ts">
import "./style.scss"
import { PageHeader } from "@/widgets/page-header";
import { MessagesList } from "@/widgets/messages-list";
import { SendMessage } from "@/features/send-message";
import { HrSeparator } from "@/shared/ui/hr-separator";
import { testMessages, testUsers } from "./test-messages";
</script>

<template>
    <div class="chat-page">
        <header class="chat-page__header">
            <page-header>
                Chat 1
            </page-header>
            <div class="chat-page__users-button">
                <v-btn prepend-icon="mdi-account-group"
                       variant="plain">27 users</v-btn>
            </div>
        </header>
        <hr-separator/>
        <main class="chat-page__body">
            <messages-list :messages="testMessages"
                           :users="testUsers"
                           :user-id="1" />
            <send-message :channel-id="1" :user-id="1" />
        </main>
    </div>
</template>
