import type { EntityBase } from "@/shared/api/indexed-db"

export type Subscribe = EntityBase & {
    user: IDBValidKey,
    channel: IDBValidKey
}
