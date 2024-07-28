<script setup lang="ts">
import { reactive, ref } from "vue";
import "./style.scss"
import { useUser, useUserApi, type User_I } from "@/entities/user";
import { useRouter } from "vue-router";
import { toRaw } from "vue";
import PageContainer from "@/shared/ui/layouts/page-container/PageContainer.vue";
import { useNotifications } from "@/entities/notification";

const user = useUser();
const userApi = useUserApi();
const notifications = useNotifications();
const router = useRouter();

const email = ref("");
const loginValid = ref(false);

const regValue = reactive<User_I>({
    avatar: "https://placehold.co/100x100",
    email: "",
    name: "",
    username: ""
})
const regValid = ref(false);

const regFields: { placeholder: string, key: keyof User_I }[] = [{
    placeholder: "Email",
    key: "email"
}, {
    placeholder: "Name",
    key: "name"
}, {
    placeholder: "Username",
    key: "username"
}];

async function onLogin() {
    if (await user.login(email.value)) {
        router.replace("/");
    } else {
        notifications.openNotification("Email is not found");
    }
}

async function onRegistration() {
    try {
        const id = await userApi.newUser(toRaw(regValue));

        if (id) {
            user.setUserId(id);
            router.replace("/");
        }
    } catch (e) {
        notifications.openNotification("Email or username is already in use");
    }
}

const isLogin = ref(true);

</script>

<template>
    <!-- TODO: Move login and sign in to widgets... -->
    <page-container :elevated="false">
        <div class="login-page">
            <v-card v-if="isLogin"
                    class="login-widget"
                    elevation="5">
                <v-card-title class="login-widget__title text-h6 text-uppercase">
                    Login
                </v-card-title>
                <v-card-text>
                    <v-form class="login-widget__form"
                            v-model="loginValid"
                            @submit.prevent="loginValid && onLogin()"
                            validate-on="input">
                        <v-text-field type="email"
                                      v-model="email"
                                      variant="outlined"
                                      :rules="[(v) => !!v || 'Required']"
                                      placeholder="Email" />
                        <v-btn type="submit"
                               block> Submit </v-btn>
                    </v-form>
                </v-card-text>
                <v-card-text>
                    <v-btn variant="plain"
                           block
                           :ripple="false"
                           @click="isLogin = !isLogin">Registration is here!</v-btn>
                </v-card-text>
            </v-card>
            <v-card v-else
                    class="login-widget"
                    elevation="5">
                <v-card-title class="login-widget__title text-h6 text-uppercase">
                    Registration
                </v-card-title>
                <v-card-text>
                    <v-form class="login-widget__form"
                            v-model="regValid"
                            @submit.prevent="regValid && onRegistration()"
                            validate-on="input">
                        <v-text-field v-for="field in regFields"
                                      :key="field.key"
                                      :placeholder="field.placeholder"
                                      v-model="regValue[field.key]"
                                      :rules="[(v) => !!v || 'Required']"
                                      required
                                      variant="outlined" />
                        <v-btn type="submit"
                               block> Submit </v-btn>
                    </v-form>
                </v-card-text>
                <v-card-text>
                    <v-btn variant="plain"
                           block
                           :ripple="false"
                           @click="isLogin = !isLogin">Login is here!</v-btn>
                </v-card-text>
            </v-card>
        </div>
    </page-container>
</template>