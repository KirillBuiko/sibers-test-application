<script setup lang="ts">
import type { User_O } from "@/entities/user";
import { useUsersSearch } from "../api";
import _ from "lodash";
import { ref } from "vue";
// import "./style.scss"

const actions = useUsersSearch();
const isLoading = ref(true);

const emits = defineEmits<{
    (e: "search", users: User_O[]): void
}>()

const onSearch = _.debounce(async (value: string) => {
    isLoading.value = true;
    emits("search", await actions.searchUsers(value));
    isLoading.value = false;
}, 200);

onSearch("");

</script>

<template>
    <v-text-field :loading="isLoading"
                  placeholder="Enter name or email to search"
                  @update:model-value="onSearch" />
</template>