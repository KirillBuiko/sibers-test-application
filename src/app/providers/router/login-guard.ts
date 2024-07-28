import { useUser } from "@/entities/user-e";
import type { NavigationGuard } from "vue-router"

/**
 * Check if user authorized. Otherwise go to login.
 */

export const loginGuard: NavigationGuard = function (to) {
    const user = useUser();
    if (!user.isAuthorized && to.name != "login") {
        return { name: "login" }
    }
}