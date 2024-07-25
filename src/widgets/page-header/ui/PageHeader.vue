<script setup lang="ts">
import "./style.scss";
import { BackButton } from "@/features/back-button";
</script>

<template>
    <div class="page-header">
        <div class="page-header__back-button">
            <back-button />
        </div>
        <h1 class="page-header__title">
            <slot />
        </h1>
    </div>
</template>