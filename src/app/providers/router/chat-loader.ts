import { useSubscribeApi } from "@/entities/subscribe/api/subscribe-api";
import { useUser } from "@/entities/user-e";
import { useChatContext } from "@/pages/chat"
import type { NavigationGuard } from "vue-router"

/**
 * Preloading chat context with messages, users and others.
 * Return to channels if not subscribed
 */
export const chatLoader: NavigationGuard = async function (to) {
    const chatContext = useChatContext();
    const subscribeApi = useSubscribeApi();
    const user = useUser();

    const id = Number(to.params.id as string) || undefined;
    try {
        if (id != undefined) {
            if (await subscribeApi.isSubscribed({ user: user.getUserId()!, channel: id })) {
                await chatContext.setChannel(id);
                return true;
            }
        }
    } catch (e) {
        console.log(e);
    }
    return { name: "channels" }
}