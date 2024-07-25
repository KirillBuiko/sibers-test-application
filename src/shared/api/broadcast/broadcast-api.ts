import { defineStore } from "pinia";
import { BROADCAST_CHANNEL } from "../../config";
import type { BroadcastEvent, BroadcastEventHandler, BroadcastHandlerFunction, BroadcastMessage } from "./types";

export const useBroadcastApi = defineStore("broadcast-api", () => {
    const channel = new BroadcastChannel(BROADCAST_CHANNEL);
    const eventHandlers: BroadcastEventHandler[] = [];

    channel.onmessage = function (ev: MessageEvent<BroadcastMessage>) {
        eventHandlers.forEach(handler => {
            if (handler.event == ev.data.type) {
                handler.fn(ev.data.value);
            }
        });
    }

    function sendMessage<E extends BroadcastEvent>(message: BroadcastMessage<E>) {
        channel.postMessage(message);
        eventHandlers.forEach((handler) => {
            if (message.type === handler.event) handler.fn(message.value);
        })
    }

    function on<E extends BroadcastEvent>(event: E, fn: BroadcastHandlerFunction<E>) {
        eventHandlers.push({
            event,
            fn: fn as BroadcastHandlerFunction
        })

    }

    return { sendMessage, on, channel }
})