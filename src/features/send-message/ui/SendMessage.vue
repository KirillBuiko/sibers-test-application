<script setup lang="ts">
import { useMessageApi } from "@/entities/message/api/message-api";
import "./style.scss";
import { ref } from "vue";
const api = useMessageApi();
const text = ref("");
const emits = defineEmits<{
    (e: "send-message", value: string): void
}>()

function onSend() {
    emits("send-message", text.value);
    text.value = "";
}
</script>

<template>
    <div class="send-message">
        <v-text-field class="send-message__input"
                      v-model="text"
                      placeholder="Введите сообщение"
                      multi-line />
        <v-btn class="send-message__button"
               @click="onSend" />
    </div>
</template>