import { useBroadcastApi } from "@/shared/api/broadcast";
import { useIndexDBApi, type IDBGetOptions } from "@/shared/api/indexed-db/indexed-db"
import { IndexedDbStore } from "@/shared/config";
import type { User_I, User_O } from "../model";

export const useUserApi = () => {
    const db = useIndexDBApi();
    const broadcast = useBroadcastApi();

    async function getUser(id: string) {
        const store = await db.getTransactionStore(IndexedDbStore.USERS);
        return await db.storeGet(store, id);
    }

    async function getUserByEmail(email: string) {
        const index = (await db.getTransactionStore(IndexedDbStore.USERS)).index("email");
        return await db.storeGet<User_O>(index, email);
    }

    async function fetchUsers(options: IDBGetOptions) {
        const store = await db.getTransactionStore(IndexedDbStore.USERS);
        return await db.storeGetAll(store, options);
    }

    async function fetchUsersByIds(ids: number[]) {
        const store = await db.getTransactionStore(IndexedDbStore.USERS);
        return await Promise.all(ids.map(id => db.storeGet<User_O>(store, id)));
    }

    async function newUser(user: User_I) {
        const store = await db.getTransactionStore(IndexedDbStore.USERS);
        const id = (await db.storePut<User_I>(store, user)) as number
        broadcast.sendMessage({
            type: "new-user",
            value: {
                user: id
            }
        })
        return id;
    }

    return { fetchUsers, newUser, getUser, getUserByEmail, fetchUsersByIds }
}