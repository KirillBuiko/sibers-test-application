import type { Channel_O } from "@/entities/channel";
import { useNotifications } from "@/entities/notification";
import type { Subscribe_I } from "@/entities/subscribe";
import { useSubscribeApi } from "@/entities/subscribe/api/subscribe-api";

/** Channel actions API */
export const useChannelActions = () => {
    const subscribeApi = useSubscribeApi();
    const notifications = useNotifications();

    async function subscribe(channel: Channel_O, sub: Subscribe_I) {
        if (sub.user == undefined || sub.channel == undefined) return;
        if (channel.blacklist.includes(sub.user)) {
            notifications.openNotification("You're blocked in this channel");
        } else {
            return subscribeApi.subscribe(sub);
        }
    }

    async function unsubscribe(sub: Subscribe_I) {
        if (sub.user == undefined || sub.channel == undefined) return;
        return subscribeApi.unsubscribe(sub);
    }

    return { subscribe, unsubscribe }
}