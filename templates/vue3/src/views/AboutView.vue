<script setup lang="ts">
import useCounterStore from '@/store/modules/counter'

const counterStore = useCounterStore()
</script>

<template>
  <main>
    <h1>About View</h1>
    <p>{{ counterStore.count }}</p>
  </main>
</template>
