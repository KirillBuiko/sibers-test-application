<script setup lang="ts">
import type { User_O } from "@/entities/user-e";
import "./style.scss"
import type { Message_O } from "@/entities/message";
import { MessageItem } from "@/entities/message";
import { ref } from "vue";

const props = defineProps<{
    messages: Message_O[],
    users: { [ind: number]: User_O }
    userId: number
}>()

const listRef = ref<HTMLElement | null>(null)

function goToStart() {
    if (listRef.value) {
        listRef.value.scrollTop = listRef.value.scrollHeight;
    }
}

defineExpose({ goToStart });

</script>

<template>
    <div class="messages-list"
         ref="listRef">
        <message-item class="messages-list__item"
                      v-for="m in props.messages"
                      :key="m.id"
                      :avatar-link="props.users[m.user]?.avatar"
                      :name="props.users[m.user]?.name"
                      :value="m.value"
                      :is-sender="props.userId == m.user" />
    </div>
</template>