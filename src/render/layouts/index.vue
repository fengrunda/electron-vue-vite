<template>
  <el-container>
    <el-aside width="200px">
      <sider />
    </el-aside>
    <el-main>
      <slot />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sider from "./sider.vue";

export default defineComponent({
  name: "AppLayout",
  components: {
    Sider,
  },
  setup() {},
});
</script>

