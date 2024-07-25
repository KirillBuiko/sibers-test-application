import { useChannelApi } from "@/entities/channel";
import { useMessageApi } from "@/entities/message";
import { useSubscribeApi } from "@/entities/subscribe/api/subscribe-api";
import { useUserApi } from "@/entities/user";

function randomNumber() {
    return Math.floor(Math.random() * 1000000)
}

const testMessage: string = "Eiusmod ullamco veniam anim ullamco in exercitation ullamco aute magna. Ullamco non cillum ullamco minim ad magna mollit enim. Eu id est adipisicing ad qui dolore consequat ullamco aliquip consectetur commodo aliquip aliquip id."


export async function fillDbWithTestData() {
    const messageApi = useMessageApi();
    const channelApi = useChannelApi();
    const subscribeApi = useSubscribeApi();
    const userApi = useUserApi();

    const users = [
        await userApi.newUser({
            avatar: "https://placehold.co/100x100",
            email: `user${randomNumber()}@mail.ru`,
            name: `User ${randomNumber()}`,
            username: `user.${randomNumber()}`
        }), await userApi.newUser({
            avatar: "https://placehold.co/100x100",
            email: `user${randomNumber()}@mail.ru`,
            name: `User ${randomNumber()}`,
            username: `user.${randomNumber()}`
        })];

    console.log("USERS", users);

    const channel = await channelApi.createChannel({
        blackList: [],
        name: `Channel ${randomNumber()}`,
        owner: users[0]
    });

    console.log("CH", channel);

    const subscriptions = [
        await subscribeApi.subscribe({ channel, user: users[0] }),
        await subscribeApi.subscribe({ channel, user: users[1] })
    ]

    console.log("SUBS", subscriptions);

    const messages = [
        ...await Promise.all([...Array(5).keys()].map(() =>
            messageApi.sendMessage({
                channel: channel,
                user: users[0],
                value: testMessage
            }))),
        ...await Promise.all([...Array(5).keys()].map(() =>
            messageApi.sendMessage({
                channel: channel,
                user: users[1],
                value: testMessage
            })))
    ]

    console.log(messages);

    return {
        users,
        channel,
        subscriptions,
        messages
    }
}