import type { EntityBase } from "@/shared/api/indexed-db"

/** Subscribe get type */
export type Subscribe_O = EntityBase & {
    user: number,
    channel: number
}

/** Subscribe put type */
export type Subscribe_I = Partial<EntityBase> & {
    user: number,
    channel: number
}
