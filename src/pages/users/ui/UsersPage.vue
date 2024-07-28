<script setup lang="ts">
import "./style.scss"
import { PageHeader } from "@/widgets/page-header";
import { HrSeparator } from "@/shared/ui/hr-separator";
import { type User_O } from "@/entities/user-e";
import { ref } from "vue";
import PageContainer from "@/shared/ui/layouts/page-container/PageContainer.vue";
import { SearchUsers } from "@/features/search-users";
import UsersList from "@/widgets/users-list/ui/UsersList.vue";

const searchedUsers = ref<User_O[]>([]);

function onSearch(users: User_O[]) {
    searchedUsers.value = users;
}

</script>

<template>
    <page-container>
        <div class="users-page">
            <header class="users-page__header">
                <page-header>Users</page-header>
            </header>
            <hr-separator />
            <main class="users-page__body">
                <search-users @search="onSearch" />
                <users-list :users="searchedUsers" />
            </main>
        </div>
    </page-container>
</template>
