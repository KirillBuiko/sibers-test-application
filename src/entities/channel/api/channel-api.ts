import { useBroadcastApi } from "@/shared/api/broadcast";
import { useIndexDBApi, type IDBGetOptions } from "@/shared/api/indexed-db/indexed-db"
import { IndexedDbStore } from "@/shared/config";
import type { Channel_I, Channel_O } from "../model";

/**
 * Api for channel fetch
 */
export const useChannelApi = () => {
    const db = useIndexDBApi();
    const broadcast = useBroadcastApi();

    async function fetchChannelById(id: number) {
        const store = await db.getTransactionStore(IndexedDbStore.CHANNELS);
        return await db.storeGet<Channel_O>(store, id);
    }

    async function fetchChannels(options: IDBGetOptions) {
        const store = await db.getTransactionStore(IndexedDbStore.CHANNELS);
        return db.storeGetAll<Channel_O>(store, options);
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

    return { fetchChannelById, fetchChannels, createChannel }
}