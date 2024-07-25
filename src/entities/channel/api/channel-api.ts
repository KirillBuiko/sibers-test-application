import { useBroadcastApi } from "@/shared/api/broadcast";
import { useIndexDBApi, type IDBGetOptions } from "@/shared/api/indexed-db/indexed-db"
import { IndexedDbStore } from "@/shared/config";
import type { Channel_I, Channel_O } from "../model";

export const useChannelApi = () => {
    const db = useIndexDBApi();
    const broadcast = useBroadcastApi();

    async function getChannel(id: number) {
        const store = await db.getTransactionStore(IndexedDbStore.CHANNELS);
        return await db.storeGet<Channel_O>(store, id);
    }

    async function createChannel(channel: Channel_I) {
        const store = await db.getTransactionStore(IndexedDbStore.CHANNELS);
        const id = (await db.storePut<Channel_I>(store, channel)) as number;
        broadcast.sendMessage({
            type: "channel",
            value: {
                channel: id
            }
        })
        return id;
    }

    return { getChannel, createChannel }
}