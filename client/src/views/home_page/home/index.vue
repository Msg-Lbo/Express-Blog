<template>
    <div id="home">
        <n-grid cols="10" item-responsive>
            <n-grid-item span="10 768:3">
                <div class="left">
                    <sidebar />
                </div>
            </n-grid-item>
            <n-grid-item span="10 768:7">
                <div class="right">
                    <n-card :bordered="false">
                        <router-view />
                    </n-card>
                </div>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<script setup lang='ts'>
import sidebar from './components/Sidebar.vue'
</script>

<style lang='scss' scoped>
#home {
    height: 100vh;
}
</style>