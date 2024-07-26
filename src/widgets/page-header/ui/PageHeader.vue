<script setup lang="ts">
import "./style.scss";
import { BackButton } from "@/features/back-button";

const props = withDefaults(defineProps<{
    backActive: boolean
}>(), {
    backActive: true
})

</script>

<template>
    <div class="page-header">
        <div class="page-header__back-button"
             v-if="props.backActive">
            <back-button />
        </div>
        <h1 class="page-header__title">
            <slot />
        </h1>
    </div>
</template>