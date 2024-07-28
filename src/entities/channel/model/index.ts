import type { EntityBase } from "@/shared/api/indexed-db"

/** Channel get type */
export type Channel_O = EntityBase & {
    name: string,
    owner: number,
    blacklist: number[]
}

/** Channel put type */
export type Channel_I = Partial<EntityBase> & {
    name: string,
    owner: number,
    blacklist: number[]
}
