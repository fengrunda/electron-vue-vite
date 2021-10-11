<template>
  <el-popover ref="popover" placement="right-start" trigger="hover">
    <template #reference>
      <el-icon>
        <expand />
      </el-icon>
    </template>
    <div class="list-group">
      <div class="list-item" @click="logout">退出</div>
    </div>
  </el-popover>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { event } from "@/common/constant";

export default defineComponent({
  name: "Settings",
  setup() {
    const logout = () => {
      window.bridge.ipcRenderer.invoke(event.LOGOUT);
    };

    return {
      logout,
    };
  },
});
</script>

<style lang="less" scoped>
.list-item {
  padding: 4px 0;
  cursor: pointer;
}
</style>
