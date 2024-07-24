import { useChatContext } from "@/pages/chat"
import type { NavigationGuard } from "vue-router"

export const chatLoader: NavigationGuard = async function (to) {
    const chatContext = useChatContext();
    const id = to.params.id;
    try {
        if (id) {
            await chatContext.setChannel(+id);
            return true;
        } else {
            return { name: "channels" }
        }
    } catch (e) {
        return { name: "channels" }
    }
}