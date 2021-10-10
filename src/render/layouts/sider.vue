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
      <render v-if="menu.render" :render="menu.render" />
      <router-link v-else :to="route.path">
        <icon :icon="menu.icon" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, h, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
import { routes } from "@/render/router";
import ToolsComponent from "../components/ToolsComponent.vue";

export interface SiderMenu {
  title?: string;
  icon?: string | null;
  path: string;
  render?: Function;
}

function toUpperCase(str: string) {
  try {
    // user-filled => UserFilled
    return str.replace(/.*/, (s1) =>
      s1
        .split("-")
        .map((s2) => s2.charAt(0).toUpperCase() + s2.slice(1))
        .join("")
    );
  } catch (error) {
    return str;
  }
}

export default defineComponent({
  name: "Sider",
  components: {
    icon({ icon }) {
      const components = getCurrentInstance().appContext.components;
      return icon
        ? h(components.ElIcon, h(components[toUpperCase(icon)]))
        : null;
    },
    render: ({ render }) => render(),
  },
  setup() {
    const route = useRoute();
    const menus: SiderMenu[] = routes
      .filter((r) => r?.meta?.name)
      .map((r) => ({
        title: r?.meta?.name as string,
        icon: r?.meta?.icon as string,
        path: r.path,
      }))
      .concat({
        title: "开发者工具",
        icon: null,
        path: "/devtools",
        render: () =>
          h(
            "div",
            {
              class: "w-100 d-flex justify-content-center",
              style: { position: "absolute", bottom: "50px" },
            },
            h(ToolsComponent, { layout: "vertical" })
          ),
      } as any)
      .concat({
        title: "更多",
        path: "/setting",
        icon: "expand",
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
