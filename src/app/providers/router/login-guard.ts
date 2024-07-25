import { useUser } from "@/entities/user";
import type { NavigationGuard } from "vue-router"

export const loginGuard: NavigationGuard = function (to) {
    const user = useUser();
    if (!user.isAuthorized && to.name != "login") {
        return { name: "login" }
    }
}