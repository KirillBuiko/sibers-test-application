import { defineStore } from "pinia";
import { BROADCAST_CHANNEL } from "../../config";
import type { BroadcastEvent, BroadcastEventHandler, BroadcastHandlerFunction, BroadcastMessage } from "./types";

/** Broadcast api. Can send messages to other tabs and receive */
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

    /** Send message to other tabs. Will fire in-page subscribers */
    function sendMessage<E extends BroadcastEvent>(message: BroadcastMessage<E>) {
        channel.postMessage(message);
        eventHandlers.forEach((handler) => {
            if (message.type === handler.event) handler.fn(message.value);
        })
    }

    /** Subscribe on receive events. Will fire on in-page events */
    function on<E extends BroadcastEvent>(event: E, fn: BroadcastHandlerFunction<E>) {
        eventHandlers.push({
            event,
            fn: fn as BroadcastHandlerFunction
        })
    }

    return { sendMessage, on, channel }
})