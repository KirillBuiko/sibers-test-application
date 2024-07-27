import type { EntityBase } from "@/shared/api/indexed-db"

export type Channel_O = EntityBase & {
    name: string,
    owner: number,
    blacklist: number[]
}

export type Channel_I = Partial<EntityBase> & {
    name: string,
    owner: number,
    blacklist: number[]
}
