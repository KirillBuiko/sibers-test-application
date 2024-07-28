import type { EntityBase } from "@/shared/api/indexed-db"

/** Message get type */
export type Message_O = EntityBase & {
    user: number,
    channel: number,
    value: string
}

/** Message put type */
export type Message_I = Partial<EntityBase> & {
    user: number,
    channel: number,
    value: string
}