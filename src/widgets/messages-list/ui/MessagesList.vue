<script setup lang="ts">
import type { User } from "@/entities/user";
import "./style.scss"
import type { Message_O } from "@/entities/message";
import { MessageItem } from "@/entities/message";

const props = defineProps<{
    messages: Message_O[],
    users: { [ind: number]: User }
    userId: number
}>()
</script>

<template>
    <div class="messages-list">
        <message-item class="messages-list__item"
                      v-for="m in props.messages"
                      :key="m.id"
                      :avatar-link="props.users[m.user].avatar"
                      :name="props.users[m.user].name"
                      :value="m.value" />
    </div>
</template>