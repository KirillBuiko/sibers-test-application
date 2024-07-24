import type { EntityBase } from "@/shared/api/indexed-db"

export type User = EntityBase & {
    name: string,
    username: string,
    email: string,
    avatar: string
}
