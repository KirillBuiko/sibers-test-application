import type { Channel_O } from "@/entities/channel";
import type { Subscribe_I } from "@/entities/subscribe";
import { useSubscribeApi } from "@/entities/subscribe/api/subscribe-api";

export const useChannelActions = () => {
    const subscribeApi = useSubscribeApi();

    async function subscribe(channel: Channel_O, sub: Subscribe_I) {
        if (sub.user == undefined || sub.channel == undefined) return;
        if (channel.blacklist.includes(sub.user)) {
            // TODO: Notification
            throw "Blacklisted";
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