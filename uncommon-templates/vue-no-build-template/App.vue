<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld />
  <nav>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/About">About</RouterLink>
  </nav>
  <router-view></router-view>
</template>
