<script setup lang="ts">
import { ref } from "vue";
import "./style.scss"
import { useUser } from "@/entities/user";
import { useRouter } from "vue-router";
const email = ref("");
const user = useUser();
const router = useRouter();

async function onSubmit() {
    if (await user.login(email.value)) {
        router.replace("/");
    }
}
</script>

<template>
    <div class="login-page">
        <v-card class="login-widget">
            <v-card-title class="login-widget__title text-h6 text-uppercase">
                Login
            </v-card-title>
            <v-card-text>
                <v-form class="login-widget__form"
                        @submit.prevent="onSubmit">
                    <v-text-field type="email"
                                  v-model="email"
                                  placeholder="Email" />
                    <v-btn type="submit"
                           block> Submit </v-btn>
                </v-form>
            </v-card-text>
            <v-card-text>
                <v-btn variant="plain"
                       block
                       :ripple="false">Registration is here!</v-btn>
            </v-card-text>
        </v-card>
    </div>
</template>