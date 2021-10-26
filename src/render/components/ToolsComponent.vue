<template>
  <div class="custom-devtool">
    <div
      :class="[
        'icon-group d-flex',
        layout,
        layout === 'vertical' ? 'flex-column' : '',
      ]"
    >
      <el-tooltip placement="right" content="切换开发者工具">
        <el-icon @click="toggleDevtools">
          <operation />
        </el-icon>
      </el-tooltip>
      <el-tooltip placement="right" content="首页">
        <el-icon @click="router.push('/')">
          <platform />
        </el-icon>
      </el-tooltip>
      <el-icon @click="window.history.back()">
        <back />
      </el-icon>
      <el-icon @click="window.history.forward()">
        <right />
      </el-icon>
      <el-icon @click="window.location.reload()">
        <refresh-right />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { event } from "@/common/constant";

export interface ToolsComponentProps {
  layout?: "horizontal" | "vertical";
}

export default defineComponent({
  name: "ToolsComponent",
  props: {
    layout: String as { (): ToolsComponentProps["layout"] },
  },
  setup(props) {
    const router = useRouter();

    const toggleDevtools = () => {
      window.bridge.ipcRenderer.invoke(event.TOGGLE_DEVTOOLS);
    };

    return {
      window,
      router,
      toggleDevtools,
    };
  },
});
</script>

<style lang="less" scoped>
.custom-devtool {
  display: flex;
  align-items: center;
  line-height: initial;

  .icon-group {
    padding: 4px 0;
    border-radius: 4px;
    background: rgba(194, 194, 194, 0.14);
    color: #b3afc0;

    .anticon {
      padding: 4px;
      border-radius: 100%;

      &:hover {
        color: var(--color-primary, #ff7700);
        border-color: var(--color-primary, #ff7700);
      }

      &:first-child {
        margin-left: 0;
      }
    }
  }

  .el-icon {
    height: initial;
    line-height: inherit;
    width: 40px;
    font-size: 24px;

    &:active {
      opacity: 0.74;
    }
  }

  .href.production {
    color: transparent;

    &:hover {
      color: #999;
    }
  }

  &.vertical {
  }

  &.horizontal {
  }
}
</style>
