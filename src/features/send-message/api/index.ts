import { useMessageApi, type Message_I } from "@/entities/message"

export const useSendMessage = function() {
    const api = useMessageApi()

    async function sendMessage(message: Message_I) {
        const messageProcessed: Message_I = {
            ...message,
            value: message.value.trim()
        }

        return await api.sendMessage(messageProcessed)
    }

    return { sendMessage }
}
