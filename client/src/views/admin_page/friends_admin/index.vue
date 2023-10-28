<template>
    <div id="friends">
        <n-card :bordered="false">
            <n-tabs type="line" animated>
                <n-tab-pane name="ArticlesList" tab="待审核">
                    <wait></wait>
                </n-tab-pane>
                <n-tab-pane name="editArticle" tab="已通过">
                    <passed></passed>
                </n-tab-pane>
            </n-tabs>
        </n-card>
    </div>
</template>

<script setup lang='ts'>
import wait from './components/wait.vue';
import passed from './components/passed.vue';
document.title = '友联管理';
</script>

<style lang='scss' scoped>
#friends {
    ::v-deep(.n-card) {
        background-color: transparent;
    }
}
</style>