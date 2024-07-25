import type { EntityBase } from "@/shared/api/indexed-db"
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export type User_O = EntityBase & {
    name: string,
    username: string,
    email: string,
    avatar: string
}

export type User_I = Partial<EntityBase> & {
    name: string,
    username: string,
    email: string,
    avatar: string
}

export const useUser = defineStore("user-store", () => {
    const userId = ref(Number(localStorage.getItem("user-id")) || undefined);

    const isAuthorized = computed(() => {
        return userId.value != undefined;
    })

    function getUserId() {
        return userId.value;
    }

    function setUserId(value: number) {
        localStorage.setItem("user-id", value.toString());
        userId.value = value;
    }

    async function login(email: string) {
        
    }

    return {isAuthorized, login, setUserId, getUserId}
})
