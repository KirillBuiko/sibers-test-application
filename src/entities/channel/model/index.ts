import type { EntityBase } from "@/shared/api/indexed-db"

export type Channel = EntityBase & {
    name: string,
    owner: IDBValidKey,
    blackList: IDBValidKey[]
}