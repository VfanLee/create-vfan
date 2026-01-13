<script setup lang="ts">
import useCounterStore from '@/store/modules/counter'

const counterStore = useCounterStore()
</script>

<template>
  <main>
    <h1>Home View</h1>
    <button @click="counterStore.increment">{{ counterStore.count }}</button>
  </main>
</template>
