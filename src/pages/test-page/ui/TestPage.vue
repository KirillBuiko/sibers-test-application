<script setup lang="ts">
import "./style.scss";
import {IndexedDbTest} from '@/widgets/test/indexed-db-test';

</script>

<template>
    <div class="test-page">
        <IndexedDbTest class="test-page__first"/>
        <IndexedDbTest class="test-page__second"/>
        <IndexedDbTest class="test-page__third"/>
    </div>
</template>