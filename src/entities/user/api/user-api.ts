import { useBroadcastApi } from "@/shared/api/broadcast";
import { useIndexDBApi, type IDBGetOptions } from "@/shared/api/indexed-db/indexed-db"
import { IndexedDbStore } from "@/shared/config";
import type { User } from "../model";

export const useUserApi = () => {
    const db = useIndexDBApi();
    const broadcast = useBroadcastApi();

    async function getUser(id: string) {
        const store = await db.getTransactionStore(IndexedDbStore.USERS);
        return await db.storeGet(store, id);
    }

    async function fetchUsers(options: IDBGetOptions) {
        const store = await db.getTransactionStore(IndexedDbStore.USERS);
        return await db.storeGetAll(store, options);
    }

    async function fetchUsersByIds(ids: number[]) {
        const store = await db.getTransactionStore(IndexedDbStore.USERS);
        return await Promise.all(ids.map(id => db.storeGet<User>(store, id)));
    }

    async function newUser(user: User) {
        const store = await db.getTransactionStore(IndexedDbStore.USERS);
        const key = await db.storePut<User>(store, user)
        broadcast.sendMessage({
            type: "new-user",
            value: {
                user: key
            }
        })
    }

    return { fetchUsers, newUser, getUser, fetchUsersByIds }
}