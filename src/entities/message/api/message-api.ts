import { useBroadcastApi } from "@/shared/api/broadcast";
import { useIndexDBApi,type IDBGetOptions } from "@/shared/api/indexed-db/indexed-db"
import { IndexedDbStore } from "@/shared/config";
import type { Message_I, Message_O } from "../model";

export const useMessageApi = () => {
    const db = useIndexDBApi();
    const broadcast = useBroadcastApi();

    async function fetchMessagesByChannel(options: IDBGetOptions) {
        const store = await db.getTransactionStore(IndexedDbStore.MESSAGES);
        const index = store.index("channel");
        return db.storeGetAll<Message_O>(index, options);
    }

    async function sendMessage(message: Message_I) {
        const store = await db.getTransactionStore(IndexedDbStore.MESSAGES);
        const id = (await db.storePut<Message_I>(store, message)) as number;
        broadcast.sendMessage({
            type: "message",
            value: {
                inChannel: message.channel
            }
        })
        return id;
    }

    return { fetchMessagesByChannel, sendMessage }
}