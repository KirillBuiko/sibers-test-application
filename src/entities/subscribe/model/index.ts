import type { EntityBase } from "@/shared/api/indexed-db"

export type Subscribe_O = EntityBase & {
    user: IDBValidKey,
    channel: IDBValidKey
}

export type Subscribe_I = Partial<EntityBase> & {
    user: IDBValidKey,
    channel: IDBValidKey
}
