import { useBroadcastApi } from "@/shared/api/broadcast";
import { useIndexDBApi } from "@/shared/api/indexed-db/indexed-db"
import { IndexedDbStore } from "@/shared/config";
import type { Subscribe } from "../model";

export const useSubscribeApi = () => {
    const db = useIndexDBApi();
    const broadcast = useBroadcastApi();

    async function fetchUserChannels(user: IDBValidKey) {
        const index = (await db.getTransactionStore(IndexedDbStore.SUBSCRIPTIONS)).index("user");
        return db.storeGetAll<Subscribe>(index, {
            key: user
        })
    }

    async function fetchChannelUsers(channel: IDBValidKey) {
        const index = (await db.getTransactionStore(IndexedDbStore.SUBSCRIPTIONS)).index("channel");
        return db.storeGetAll<Subscribe>(index, {
            key: channel
        })
    }

    async function subscribe(subscribe: Subscribe) {
        const store = await db.getTransactionStore(IndexedDbStore.SUBSCRIPTIONS);
        const key = await db.storePut<Subscribe>(store, subscribe);
        broadcast.sendMessage({
            type: "channel",
            value: {
                channel: subscribe.channel
            }
        })
        return key;
    }

    async function unsubscribe(subscribe: Subscribe) {
        const store = await db.getTransactionStore(IndexedDbStore.SUBSCRIPTIONS);
        const index = store.index("user-channel");
        const sub = (await db.storeGet<Subscribe>(index, [subscribe.user, subscribe.channel]));
        if (sub) {
            await db.storeDelete(store, sub.id);
            broadcast.sendMessage({
                type: "channel",
                value: {
                    channel: subscribe.channel
                }
            })
        }
    }

    return { fetchUserChannels, fetchChannelUsers, subscribe, unsubscribe }
}