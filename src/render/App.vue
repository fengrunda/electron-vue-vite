<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppLayout from "./layouts/index.vue";

export default defineComponent({
  name: 'App',
  components: {
    AppLayout,
  },
  setup() {},
});
</script>

