import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotifications = defineStore("notifications-store", () => {
    const notificationText = ref("");
    const isOpen = ref(false);
    let timerId = -1;

<<<<<<< HEAD
    function openNotification(text: string, timeout: number = 2000) {
=======
    function openNotification(text: string, timeout: number = 1000) {
>>>>>>> cc2d4248aeeb5958d60987614c730dfa9fb08761
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