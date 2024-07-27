import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotifications = defineStore("notifications-store", () => {
    const notificationText = ref("");
    const isOpen = ref(false);
    let timerId = -1;

    function openNotification(text: string, timeout: number = 2000) {
        if (isOpen.value) {
            clearTimeout(timerId);
        }
        notificationText.value = text;
        isOpen.value = true;
        timerId = setTimeout(() => {
            isOpen.value = false;
        }, timeout);
    }

    function closeNotification() {
        isOpen.value = false;
        clearTimeout(timerId);
    }

    return { notificationText, isOpen, openNotification, closeNotification }
})