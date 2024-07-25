import { defineStore } from "pinia";
import { INDEXED_DB_NAME, INDEXED_DB_VER, type IndexedDbStore } from "../../config";
import _ from "lodash";
import { dbUpgrade } from "./db-upgrade";

export type EntityBase = { id: number };

export type OptionalId<T extends EntityBase> = Omit<T, "id"> & Partial<EntityBase>

export type IDBGetOptions = {
    key?: IDBValidKey | IDBKeyRange | null,
    limit?: number,
    direction?: IDBCursorDirection
}

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

            // Client db initialize on init / version change
            request.onupgradeneeded = dbUpgrade;
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

    async function storeGet<V>(store: IDBObjectStore | IDBIndex, key: IDBValidKey | IDBKeyRange) {
        return handleRequest<V>(store.get(key));
    }

    async function storePut<V>(store: IDBObjectStore, value: V, key?: IDBValidKey) {
        return handleRequest<IDBValidKey>(store.put(value, key));
    }

    async function storeGetAll<V>(store: IDBObjectStore | IDBIndex, options?: IDBGetOptions): Promise<V[]> {
        const defaultOptions = _.defaults<IDBGetOptions | undefined, IDBGetOptions>(options, {
            key: null,
            limit: -1,
            direction: "next"
        })
        return new Promise((resolve) => {
            const result: V[] = [];
            let counter = 0;
            store.openCursor(defaultOptions.key, defaultOptions.direction).onsuccess = function () {
                counter++;
                const cursor = this.result;
                if (cursor) {
                    result.push(cursor.value);
                    if (counter == defaultOptions.limit) {
                        resolve(result);
                    } else {
                        cursor.continue();
                    }
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