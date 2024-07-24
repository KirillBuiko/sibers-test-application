<script setup lang="ts">
import { AvatarIcon } from '@/shared/ui';

const props = defineProps<{
    avatarLink: string,
    name: string,
    value: string,
}>()
</script>

<template>
    <div class="message-item">
        <div class="message-item__avatar">
            <avatar-icon :image-link="props.avatarLink" />
        </div>
        <div class="message-item__body">
            <div class="message-item__name">
                {{ props.name }}
            </div>
            <div class="message-item__value">
                {{ props.value }}
            </div>
        </div>
    </div>
</template>