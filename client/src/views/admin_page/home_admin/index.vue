<template>
    <div id="home-admin">
        <n-layout style="height: 100vh">
            <n-layout-header style="height: 64px;" bordered>
                <header-view></header-view>
            </n-layout-header>
            <n-layout position="absolute" style="top: 64px; bottom: 64px" has-sider>
                <n-layout-sider :native-scrollbar="false" :collapsed-width="64" show-trigger collapse-mode="width"
                    :width="240" bordered>
                    <admin-menu></admin-menu>
                </n-layout-sider>
                <n-layout>
                    <router-view></router-view>
                </n-layout>
            </n-layout>
            <n-layout-footer position="absolute" style="height: 64px; padding: 24px" bordered>
                城府路
            </n-layout-footer>
        </n-layout>
    </div>
</template>

<script setup lang='ts'>
import adminMenu from './components/menu.vue'
import headerView from './components/header.vue'
document.title = '后台管理'
</script>

<style lang='scss' scoped>
#home-admin {
    min-width: 500px;
}
</style>