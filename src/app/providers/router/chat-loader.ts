import { useSubscribeApi } from "@/entities/subscribe/api/subscribe-api";
import { useUser } from "@/entities/user";
import { useChatContext } from "@/pages/chat"
import type { NavigationGuard } from "vue-router"

/**
 * Preloading chat context with messages, users and others.
 * Return to channels if not subscribed
 */
export const chatLoader: NavigationGuard = async function (to) {
    console.log(`LOADER ${to.params.id}`);
    const chatContext = useChatContext();
    const subscribeApi = useSubscribeApi();
    const user = useUser();

    const id = Number(to.params.id as string) || undefined;
    try {
        if (id != undefined) {
            // TODO: Debug only, remove it
            // const users = (await subscribeApi.fetchChannelUsers(id));
            // console.log(users);
            // user.setUserId(users[0] && users[0].id || -1);

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