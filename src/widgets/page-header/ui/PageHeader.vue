<script setup lang="ts">
import "./style.scss";
</script>

<template>
    <div class="page-header">
        <div class="page-header__back-button">
            
        </div>
        <h1>
            <slot name="title" />
        </h1>
    </div>
</template>