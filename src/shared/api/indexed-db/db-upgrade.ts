import { IndexedDbStore } from "@/shared/config";

export const dbUpgrade: ((this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any) = function () {
    const db = this.result;
    const channels = db.createObjectStore(IndexedDbStore.CHANNELS, { autoIncrement: true, keyPath: "id" });
    createBasicIndex(channels, ["owner", "blacklist"], { unique: false });
    createBasicIndex(channels, ["name"], { unique: true });

    const messages = db.createObjectStore(IndexedDbStore.MESSAGES, { autoIncrement: true, keyPath: "id" });
    messages.createIndex("user-channel", ["user", "channel"], { unique: false })
    createBasicIndex(messages, ["user", "channel", "value"], { unique: false });

    const subscriptions = db.createObjectStore(IndexedDbStore.SUBSCRIPTIONS, { autoIncrement: true, keyPath: "id" });
    subscriptions.createIndex("user-channel", ["user", "channel"], { unique: false })
    createBasicIndex(subscriptions, ["user", "channel"], { unique: false });

    const users = db.createObjectStore(IndexedDbStore.USERS, { autoIncrement: true, keyPath: "id" });
    createBasicIndex(users, ["name", "avatar"], { unique: false });
    createBasicIndex(users, ["username", "email"], { unique: true });
}

function createBasicIndex(store: IDBObjectStore, names: string[], options: IDBIndexParameters) {
    names.forEach(key => {
        store.createIndex(key, key, options);
    })
}