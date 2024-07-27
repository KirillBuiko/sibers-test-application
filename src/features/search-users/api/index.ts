import { useUserApi } from "@/entities/user"
import _ from "lodash";
import { compareTwoStrings } from "string-similarity";

export const useUsersSearch = () => {
    const userApi = useUserApi();

    async function searchUsers(text: string) {
        const allUsers = await userApi.fetchUsers();
        const lowerText = text.toLowerCase();
        if (!text) return _.sortBy(allUsers, ["name"]);
        const rankedUsers = allUsers.map((user) => ({
            rank: _.max([
                compareTwoStrings(lowerText, user.name.toLowerCase()),
                compareTwoStrings(lowerText, user.email.toLowerCase())
            ]) as number,
            user
        }))
        return _.chain(rankedUsers)
            .filter(ranked => ranked.rank > 0.4)
            .sortBy(["rank"])
            .map(ranked => ranked.user)
            .value();
    }

    return { searchUsers }
}
