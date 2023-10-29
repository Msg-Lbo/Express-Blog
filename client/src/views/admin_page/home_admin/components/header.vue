<template>
  <div id="header">
    <div class="logo">
      <img :src="Logo" alt="" srcset="" />
    </div>
    <div class="headimg">
      <n-dropdown trigger="click" :options="userOptions" @select="handleSelect">
        <n-avatar round :size="42" :src="Avatar" />
      </n-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuOption, NIcon } from "naive-ui";
import { LogOutOutlined as logoutIcon } from "@vicons/material";
import { Component, h } from "vue";
import { useUserStore } from "@/store/userSotre";
import { useSettingsStore } from "@/store/settings";
import router from "@/router";
const userStore = useUserStore();
const settingStore = useSettingsStore();
const { Logo, Avatar } = settingStore.$state.siteSettings;
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const userOptions: MenuOption[] = [
  {
    label: "退出登录",
    key: "logout",
    icon: renderIcon(logoutIcon),
    show: userStore.userInfo.id !== 0,
  },
];
// 退出登陆
const logout = () => {
  userStore.logout();
};
// 事件
const handleSelect = (key: string) => {
  if (key === "logout") {
    logout();
  }
  if (key === "login") {
    router.push("/login");
  }
  if (key === "manager") {
    router.push("/admin");
  }
};
</script>

<style lang="scss" scoped>
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .logo {
    width: 100px;
    height: 64px;
    padding: 0 24px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .headimg {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
