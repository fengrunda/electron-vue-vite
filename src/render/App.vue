<template>
  <router-view v-slot="{Component}" class="main-wrapper ">
    <component :is="Component" />
  </router-view>
</template>

<script setup lang="ts">
</script>

<style rel="stylesheet/scss" lang="scss">
//
</style>
