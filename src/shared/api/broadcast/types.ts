export type BroadcastMessageValue = {
    "message": {
        inChannel: number
    },
    "channel": {
        channel: number
    },
    "channel-remove": {
        key: number
    },
    "new-user": {
        user: number
    },
    "user-block": {
        channel: number,
        user: number
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