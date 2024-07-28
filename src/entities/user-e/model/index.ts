import type { EntityBase } from "@/shared/api/indexed-db"
import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useUserApi } from "../api"

/** User get type */
export type User_O = EntityBase & {
    name: string,
    username: string,
    email: string,
    avatar: string
}

/** User put type */
export type User_I = Partial<EntityBase> & {
    name: string,
    username: string,
    email: string,
    avatar: string
}

/** Storage of global user state */
export const useUser = defineStore("user-store", () => {
    const userId = ref(Number(sessionStorage.getItem("user-id") || -1));
    const userApi = useUserApi();

    const isAuthorized = computed(() => {
        return userId.value != -1;
    })

    function getUserId() {
        return userId.value;
    }

    function setUserId(value: number) {
        sessionStorage.setItem("user-id", value.toString());
        userId.value = value;
    }

    async function login(email: string) {
        const user = await userApi.getUserByEmail(email);
        if (user) {
            setUserId(user.id);
        }
        return !!user;
    }

    function logout() {
        setUserId(-1);
    }

    return { isAuthorized, login, logout, setUserId, getUserId }
})
