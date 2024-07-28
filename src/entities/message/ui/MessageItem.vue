<script setup lang="ts">
import "./style.scss";
import { AvatarIcon } from '@/shared/ui';

const props = defineProps<{
    avatarLink: string,
    name: string,
    value: string,
    isSender: boolean
}>()
</script>

<template>
    <div class="message"
         :class="{ 'message--sender': props.isSender }">
        <avatar-icon class="message__avatar"
                     :image-link="props.avatarLink" />
        <h2 class="message__name">
            {{ props.name }}
        </h2>
        <div class="message__value">
            {{ props.value }}
        </div>
    </div>
</template>