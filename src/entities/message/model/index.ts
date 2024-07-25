import type { EntityBase } from "@/shared/api/indexed-db"

export type Message_O = EntityBase & {
    user: number,
    channel: number,
    value: string
}

export type Message_I = Partial<EntityBase> & {
    user: number,
    channel: number,
    value: string
}