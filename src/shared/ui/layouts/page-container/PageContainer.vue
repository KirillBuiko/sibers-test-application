<script setup lang="ts">
import "./style.scss"

const props = withDefaults(defineProps<{
    elevated: boolean
}>(), {
    elevated: true
})
</script>

<template>
    <div class="page-container">
        <v-card class="page-container__wrapper"
                :elevation="props.elevated ? 2 : 0">
            <slot />
        </v-card>
    </div>
</template>