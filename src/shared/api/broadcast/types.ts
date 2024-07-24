export type BroadcastMessageValue = {
    "message": {
        inChannel: IDBValidKey
    },
    "channel": {
        channel: IDBValidKey
    },
    "channel-remove": {
        key: IDBValidKey
    },
    "new-user": {
        user: IDBValidKey
    },
    "user-block": {
        channel: IDBValidKey,
        user: IDBValidKey
    }
}

export type BroadcastEvent = keyof BroadcastMessageValue;

export type BroadcastMessage<E extends BroadcastEvent = BroadcastEvent> = {
    type: E,
    value: BroadcastMessageValue[E]
}

export type BroadcastHandlerFunction<E extends BroadcastEvent = BroadcastEvent> = (message: BroadcastMessageValue[E]) => void;

export interface BroadcastEventHandler<E extends BroadcastEvent = BroadcastEvent> {
    event: E,
    fn: BroadcastHandlerFunction<E>
}