<template>
  <div id="menu">
    <n-menu :options="menuOptions" :collapsed-width="64" :collapsed-icon-size="22" @update:value="handleUpdateValue" />
  </div>
</template>

<script setup lang="ts">
import { MenuOption, NIcon } from "naive-ui";
import { Component, h } from "vue";
import {
  SpaceDashboardOutlined as DashboardIcon,
  MenuBookOutlined as BookIcon,
  CategoryOutlined as CategoryIcon,
  CommentOutlined as CommentIcon,
  LinkOutlined as LinkIcon,
  SettingsOutlined as SettingsIcon,
  BrokenImageOutlined as ImageIcon,
  AllInclusiveOutlined as AllInclusiveIcon,
} from "@vicons/material";
import router from "@/router";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
  {
    label: "仪表盘",
    key: "dashboard",
    icon: renderIcon(DashboardIcon),
  },
  {
    label: "文章管理",
    key: "article-manager",
    icon: renderIcon(BookIcon),
  },
  {
    label: "分类管理",
    key: "category-manager",
    icon: renderIcon(CategoryIcon),
  },
  {
    label: "评论管理",
    key: "comments-manager",
    icon: renderIcon(CommentIcon),
  },
  {
    label: "友联管理",
    key: "friends-manager",
    icon: renderIcon(LinkIcon),
  },
  {
    label: "其他设置",
    key: "other-settings",
    icon: renderIcon(SettingsIcon),
  },
  {
    label: "图片管理",
    key: "images-manager",
    icon: renderIcon(ImageIcon),
  },
  {
    label: "过去增多，未来减少",
    key: "list",
    icon: renderIcon(AllInclusiveIcon),
  },
];
const handleUpdateValue = (key: string) => {
  router.push(key);
};
</script>

<style lang="scss" scoped></style>
