import { useChannelsContext } from "@/pages/channels";
import type { NavigationGuard } from "vue-router"

/**
 * Preloading channels context with channels, subscribes and others.
 */
export const channelsLoader: NavigationGuard = async function () {
    const channelsContext = useChannelsContext();
    try {
        await channelsContext.init();
        return true;
    } catch (e) {
        console.log(e);
    }
    return { name: "login" }
}