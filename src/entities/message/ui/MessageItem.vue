<script setup lang="ts">
import "./style.scss";
import { AvatarIcon } from '@/shared/ui';

const props = defineProps<{
    avatarLink: string,
    name: string,
    value: string,
}>()
</script>

<template>
    <div class="message">
        <div class="message__avatar">
            <avatar-icon :image-link="props.avatarLink" />
        </div>
        <h2 class="message__name">
            {{ props.name }}
        </h2>
        <div class="message__value">
            {{ props.value }}
        </div>
    </div>
</template>