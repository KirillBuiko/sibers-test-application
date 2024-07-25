<script setup lang="ts">
import "./style.scss"
import { PageHeader } from "@/widgets/page-header";
import { MessagesList } from "@/widgets/messages-list";
import type { Message } from "@/entities/message";
import type { UserByKey } from "../model";

const messages: Message[] = [{
    id: 0,
    channel: 0,
    user: 1,
    value: "Consequat ut Lorem pariatur labore exercitation commodo voluptate adipisicing cillum. Elit ipsum voluptate fugiat eiusmod non exercitation ipsum. Officia incididunt commodo consequat et nostrud veniam tempor consectetur nisi qui."
}, {
    id: 1,
    channel: 0,
    user: 2,
    value: "Et Lorem ea quis quis consectetur et Lorem non laborum. Ipsum est eiusmod Lorem mollit sunt culpa aute voluptate consectetur sunt adipisicing. Anim reprehenderit laborum qui culpa occaecat cillum officia cillum nostrud velit. Aute ea Lorem amet deserunt amet consectetur labore sint sint. Mollit enim irure ea ea occaecat officia exercitation qui tempor nostrud quis consectetur. Consequat laborum culpa ea velit occaecat Lorem sint. Anim consequat commodo cillum ipsum proident veniam reprehenderit quis dolor nulla aliquip duis pariatur velit."
}, {
    id: 2,
    channel: 0,
    user: 1,
    value: "Eiusmod ullamco veniam anim ullamco in exercitation ullamco aute magna. Ullamco non cillum ullamco minim ad magna mollit enim. Eu id est adipisicing ad qui dolore consequat ullamco aliquip consectetur commodo aliquip aliquip id."
}]

const users: UserByKey = {
    1: {
        id: 1,
        avatar: "https://placehold.co/30x30",
        email: "user@mail.ru",
        name: "User 1",
        username: "user.1"
    },
    2: {
        id: 2,
        avatar: "https://placehold.co/30x30",
        email: "user@mail.ru",
        name: "User 2",
        username: "user.2"
    }
}

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
        <main class="chat-page__body">
            <messages-list :messages="messages" :users="users" :user-id="1" />
        </main>
    </div>
</template>
