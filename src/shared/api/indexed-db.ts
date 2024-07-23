import { defineStore } from "pinia";
import { INDEXED_DB_NAME, INDEXED_DB_VER, IndexedDbStore } from "../config";

export type IDBGetItem<V> = { value: V, key: IDBValidKey };

/**  
 * Api for indexedDB that's using in entity's api for requests. Based on promises.
 */
export const useIndexDBApi = defineStore("index-db-api", () => {
    /**  Status of indexedDB initialize*/
    let status: IDBRequestReadyState | "none" | "error" = "none";

    /**  Promise of indexedDB init */
    let _pendingPromise: Promise<IDBDatabase> | undefined = undefined;

    /** 
     * Initialize indexedDB connection, called every getStore call. Create and save init
     * promise only when status "none", otherwise return it. If promise is fulfilled it's just return db / throw error.
     */
    async function init(): Promise<IDBDatabase> {
        if (status != "error" && _pendingPromise) return _pendingPromise;
        status = "pending";
        _pendingPromise = new Promise<IDBDatabase>((resolve, reject) => {
            const request = window.indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VER);
            request.onsuccess = () => {
                status = "done";
                resolve(request.result);
            }
            request.onerror = () => {
                status = "error";
                reject(request.error)
            }
            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const store = event.target && "result" in event.target ? event.target.result as IDBDatabase : undefined;
                if (!store) {
                    reject(`Unknown error when upgrade to ${event.newVersion}`);
                    return;
                }
                store.createObjectStore(IndexedDbStore.CHANNELS, { autoIncrement: true });
                store.createObjectStore(IndexedDbStore.MESSAGES, { autoIncrement: true });
                store.createObjectStore(IndexedDbStore.USERS, { autoIncrement: true });
            }
        })
        return _pendingPromise;
    }

    async function getTransactionStore(storeName: IndexedDbStore) {
        const db = await init();
        return db.transaction(storeName, "readwrite").objectStore(storeName);
    }

    async function handleRequest<V = unknown>(request: IDBRequest): Promise<V> {
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                resolve(request.result);
            }
            request.onerror = () => {
                reject(request.error)
            }
        })
    }

    async function storeGet<V>(store: IDBObjectStore, key: string) {
        return handleRequest<V>(store.get(key));
    }

    async function storePut<V>(store: IDBObjectStore, value: V) {
        return handleRequest<undefined>(store.put(value));
    }

    async function storeGetAll<V>(store: IDBObjectStore): Promise<IDBGetItem<V>[]> {
        return new Promise((resolve) => {
            const result: IDBGetItem<V>[] = [];
            store.openCursor().onsuccess = function () {
                const cursor = this.result;
                if (cursor) {
                    result.push({ value: cursor.value, key: cursor.key });
                    cursor.continue();
                } else {
                    resolve(result);
                }
            };
        });
    }

    async function storeDelete<V>(store: IDBObjectStore, key: IDBValidKey | IDBKeyRange) {
        return handleRequest<V>(store.delete(key));
    }

    return { status, init, getTransactionStore, handleRequest, storeGet, storePut, storeGetAll, storeDelete }
})