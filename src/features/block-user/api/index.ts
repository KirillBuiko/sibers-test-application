import { useChannelApi, type Channel_O } from "@/entities/channel";
import { useNotifications } from "@/entities/notification";
import { useSubscribeApi } from "@/entities/subscribe/api/subscribe-api"
import { useUser } from "@/entities/user";
import { useBroadcastApi } from "@/shared/api/broadcast";

export const useBlockUser = () => {
    const subscribeApi = useSubscribeApi();
    const channelApi = useChannelApi();
    const notifications = useNotifications();
    const broadcast = useBroadcastApi();
    const user = useUser();

    async function blockUser(channel: Channel_O, blockUserId: number) {
        if (channel.owner != user.getUserId()) {
            notifications.openNotification("You're not permitted for this");
        } else if (channel.owner == blockUserId) {
            notifications.openNotification("You can't block yourself");
        } else {
            await channelApi.createChannel({
                ...channel,
                blacklist: [...channel.blacklist, blockUserId]
            });
            await subscribeApi.unsubscribe({
                channel: channel.id,
                user: blockUserId
            });
            broadcast.sendMessage({
                type: "user-block",
                value: {
                    channel: channel.id,
                    user: blockUserId
                }
            })
        }
    }

    return { blockUser }
}
