<template>
    <div id="home-admin">
        <n-layout style="height: 100vh">
            <n-layout-header style="height: 64px;" bordered>
                <div class="logo">
                    <img src="@/assets/images/logo.gif" alt="" srcset="">
                </div>
            </n-layout-header>
            <n-layout position="absolute" style="top: 64px; bottom: 64px" has-sider>
                <n-layout-sider :native-scrollbar="false" :collapsed-width="64" show-trigger collapse-mode="width"
                    :width="240" bordered>
                    <admin-menu></admin-menu>
                </n-layout-sider>
                <n-layout :native-scrollbar="false">
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
</script>

<style lang='scss' scoped>
#home-admin {
    min-width: 500px;

    .logo {
        width: 100px;
        height: 64px;
        padding: 0 24px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>