import type { EntityBase } from "@/shared/api/indexed-db"

export type Subscribe_O = EntityBase & {
    user: number,
    channel: number
}

export type Subscribe_I = Partial<EntityBase> & {
    user: number,
    channel: number
}
