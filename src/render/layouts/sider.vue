<template>
  <div class="sider-wrap position-relative h-100">
    <div
      v-for="(menu, idx) of menus"
      :key="idx"
      :class="[
        'menu-item',
        { active: route.path === menu.path, setting: '/setting' === menu.path },
      ]"
    >
      <router-link :to="route.path">
        {{ menu.icon }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from "vue";
import { useRoute } from "vue-router";
import { routes } from "@/render/router";

export interface SiderMenu {
  title?: string;
  icon?: JSX.Element | null;
  path: string;
  render?: Function;
}

export default defineComponent({
  name: "Sider",
  setup() {
    const route = useRoute();
    const menus: SiderMenu[] = routes
      .filter((r) => r?.meta?.name)
      .map((r) => ({
        title: r?.meta?.name as string,
        icon: r?.meta?.icon as JSX.Element,
        path: r.path,
      }))
      .concat({
        title: "开发者工具",
        icon: null,
        path: "/devtools",
        // render: () => (
        //   <div
        //     class="w-100 d-flex justify-content-center"
        //     style={{ position: "absolute", bottom: "50px" }}
        //   >
        //     <ToolsComponent layout="vertical" />
        //   </div>
        // ),
      } as any)
      .concat({
        title: "更多",
        path: "/setting",
        icon: h("el-icon", h("expand")),
      });

    return {
      route,
      menus,
    };
  },
});
</script>

<style lang="less" scoped>
.sider-wrap {
  .menu-item {
    font-size: 20px;
    line-height: 50px;
    cursor: pointer;
    color: #b3afc0;

    a {
      color: #b3afc0;
    }

    &.active {
      background-color: #e7e5eb;

      a {
        color: var(--color-primary, #594c96);
      }
    }

    &.setting {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
}

.setting-popover {
  width: 90px;

  .setting-item {
    padding: 0 4px;
    cursor: pointer;
  }
}
</style>
