import type { EntityBase } from "@/shared/api/indexed-db"

export type Message = EntityBase & {
    user: number,
    channel: number,
    value: string
}