<script setup lang="ts">
import { useBroadcastApi } from "@/shared/api/broadcast/broadcast-api";
import "./style.scss";

import { useIndexDBApi, type IDBGetItem } from '@/shared/api/indexed-db/indexed-db';
import { IndexedDbStore } from "@/shared/config";
import { ref, type Ref } from 'vue';

const indexedDB = useIndexDBApi();
const broadcast = useBroadcastApi();
const itemsList: Ref<IDBGetItem<number>[]> = ref([]);
updateList();

async function onAdd() {
    const store = await indexedDB.getTransactionStore(IndexedDbStore.MESSAGES);
    await indexedDB.storePut(store, 123);
    sendNotify();
    await updateList();
}

async function onDelete(idx: IDBValidKey) {
    const store = await indexedDB.getTransactionStore(IndexedDbStore.MESSAGES);
    await indexedDB.storeDelete(store, idx);
    sendNotify();
    await updateList();
}

async function updateList() {
    const store = await indexedDB.getTransactionStore(IndexedDbStore.MESSAGES);
    itemsList.value = (await indexedDB.storeGetAll<number>(store));
}

function sendNotify() {
    broadcast.sendMessage({
        type: "message",
        value: {
            inChannel: "123"
        }
    });
}

broadcast.on("message", (message) => {
    console.log(message);
    updateList();
})

</script>

<template>
    <div class="indexed-db-test">
        <VBtn variant="outlined"
              @click="onAdd">Add new item</VBtn>
        <div class="indexed-db-test__list">
            <div class="indexed-db-test__item"
                 v-for="(i, ind) in itemsList"
                 :key="ind">
                <span>{{ i }}</span>
                <v-btn density="compact"
                       icon="mdi-close-box"
                       @click="onDelete(i.key)"></v-btn>
            </div>
        </div>
    </div>
</template>