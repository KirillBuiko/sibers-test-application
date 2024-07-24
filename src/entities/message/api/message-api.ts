import { useBroadcastApi } from "@/shared/api/broadcast";
import { useIndexDBApi, type IDBGetOptions } from "@/shared/api/indexed-db/indexed-db"
import { IndexedDbStore } from "@/shared/config";
import type { Message } from "../model";

export const useMessageApi = () => {
    const db = useIndexDBApi();
    const broadcast = useBroadcastApi();

    async function fetchMessagesByChannel(options: IDBGetOptions) {
        const store = await db.getTransactionStore(IndexedDbStore.MESSAGES);
        const index = store.index("channel");
        return db.storeGetAll<Message>(index, options);
    }

    async function sendMessage(message: Message) {
        const store = await db.getTransactionStore(IndexedDbStore.MESSAGES);
        await db.storePut<Message>(store, message)
        broadcast.sendMessage({
            type: "message",
            value: {
                inChannel: message.channel
            }
        })
    }

    return { fetchMessagesByChannel, sendMessage }
}