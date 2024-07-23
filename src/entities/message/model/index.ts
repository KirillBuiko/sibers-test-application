import { defineStore } from "pinia";

export const useChat = defineStore("chat-store", () => {
    function fetchMessages() { }
    function removeMessage() { }
    function sendMessage() { }
    function blockUser() { }

    return { fetchMessages, removeMessage, sendMessage, blockUser }
});