<template>
    <div id="settings">
        <n-card :bordered="false">
            <n-tabs type="line" animated>
                <n-tab-pane name="site settings" tab="站点设置">
                    <site-settings></site-settings>
                </n-tab-pane>
                <n-tab-pane name="email server" tab="邮件服务">
                    Hey Jude
                </n-tab-pane>
            </n-tabs>
        </n-card>
    </div>
</template>

<script setup lang='ts'>
import siteSettings from './components/siteSettings.vue';
</script>

<style lang='scss' scoped>
#settings {
    height: 100%;

    ::v-deep(.n-card) {
        background-color: transparent;
    }
}
</style>