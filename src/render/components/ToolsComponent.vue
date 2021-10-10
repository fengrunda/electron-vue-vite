<template>
  <div class="custom-devtool">
    <div
      :class="[
        'btn-group d-flex',
        layout,
        layout === 'vertical' ? 'flex-column' : '',
      ]"
    >
      <el-tooltip placement="right" content="切换开发者工具">
        <el-icon>
          <user />
        </el-icon>
      </el-tooltip>
      <!-- <el-tooltip title="首页" {...placement}>
        <WindowsOutlined onClick={() => router.push('/')} />
      </el-tooltip>
      <ArrowLeftOutlined onClick={() => router.back()} /> <ArrowRightOutlined
      onClick={() => history.forward()} /> <ReloadOutlined onClick={() =>
      window.location.reload()} /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface ToolsComponentProps {
  layout?: "horizontal" | "vertical";
}

export default defineComponent({
  name: "ToolsComponent",
  props: {
    layout: String as { (): ToolsComponentProps["layout"] },
  },
  setup(props) {
    console.log(JSON.stringify(props), "====");
  },
});
</script>

<style lang="less" scoped>
.custom-devtool {
  display: flex;
  align-items: center;
  line-height: initial;

  .btn-group {
    padding: 4px;
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
