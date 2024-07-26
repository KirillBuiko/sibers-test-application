<script setup lang="ts">
import "./style.scss";
import { ref } from "vue";
import { useSendMessage } from "../api";
import type { Message_I } from "@/entities/message";
const api = useSendMessage();
const text = ref("");

const emits = defineEmits<{
    (e: "send-message", value: Message_I): void
}>()
const props = defineProps<{
    userId: number,
    channelId: number
}>()

async function onSend() {
    const message: Message_I = {
        channel: props.channelId,
        user: props.userId,
        value: text.value,
    }
    await api.sendMessage(message);
    emits("send-message", message);
    text.value = "";
}

window.addEventListener("keyup", function (event) {
    if (event.keyCode === 13 && event.ctrlKey) {
        onSend();
    }
});

</script>

<template>
    <v-form class="send-message"
            @submit.prevent="onSend">
        <v-textarea class="send-message__input"
                    v-model="text"
                    placeholder="Enter message here"
                    variant="outlined"
                    rows="2"
                    no-resize />
        <v-btn type="submit"
               class="send-message__button"
               variant="tonal">Send</v-btn>
    </v-form>
</template>