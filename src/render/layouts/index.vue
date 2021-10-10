<template>
  <el-container>
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
import Sider from "./sider.vue";

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

  .ant-layout-header {
    height: var(--header-height);
    background-color: #615b8a;
  }

  aside {
    background-color: #f5f5f5;
    border-right: 1px solid #dadada;
  }

  .ant-layout-sider-children {
    height: 100%;
  }

}
</style>
