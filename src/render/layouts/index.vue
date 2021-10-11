<template>
  <el-container class="app-layout h-100">
    <el-aside width="50px">
      <sider />
    </el-aside>
    <el-main>
      <slot />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sider from "./sider/index.vue";

export default defineComponent({
  name: "AppLayout",
  components: {
    Sider,
  },
  setup() {},
});
</script>

<style lang="less" scoped>
.app-layout {
  .el-aside {
    background-color: #f5f5f5;
    border-right: 1px solid #dadada;
  }
}
</style>
