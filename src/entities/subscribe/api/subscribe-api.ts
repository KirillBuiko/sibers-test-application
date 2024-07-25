import { useBroadcastApi } from "@/shared/api/broadcast";
import { useIndexDBApi } from "@/shared/api/indexed-db/indexed-db"
import { IndexedDbStore } from "@/shared/config";
import type { Subscribe_I, Subscribe_O } from "../model";

export const useSubscribeApi = () => {
    const db = useIndexDBApi();
    const broadcast = useBroadcastApi();

    async function fetchUserChannels(user: IDBValidKey) {
        const index = (await db.getTransactionStore(IndexedDbStore.SUBSCRIPTIONS)).index("user");
        return db.storeGetAll<Subscribe_O>(index, {
            key: user
        })
    }

    async function fetchChannelUsers(channel: IDBValidKey) {
        const index = (await db.getTransactionStore(IndexedDbStore.SUBSCRIPTIONS)).index("channel");
        return db.storeGetAll<Subscribe_O>(index, {
            key: channel
        })
    }

    async function subscribe(subscribe: Subscribe_I) {
        const store = await db.getTransactionStore(IndexedDbStore.SUBSCRIPTIONS);
        const key = await db.storePut<Subscribe_I>(store, subscribe);
        broadcast.sendMessage({
            type: "channel",
            value: {
                channel: subscribe.channel
            }
        })
        return key;
    }

    async function unsubscribe(subscribe: Subscribe_I) {
        const store = await db.getTransactionStore(IndexedDbStore.SUBSCRIPTIONS);
        const index = store.index("user-channel");
        const sub = (await db.storeGet<Subscribe_O>(index, [subscribe.user, subscribe.channel]));
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

    async function isSubscribed(subscribe: Subscribe_I) {
        const index = (await db.getTransactionStore(IndexedDbStore.SUBSCRIPTIONS)).index("user-channel");
        return !!(await db.storeGet<Subscribe_O>(index, [subscribe.user, subscribe.channel]))
    }

    return { fetchUserChannels, fetchChannelUsers, subscribe, unsubscribe, isSubscribed }
}