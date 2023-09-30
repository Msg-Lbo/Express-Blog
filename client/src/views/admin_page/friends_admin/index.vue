<template>
    <div id="friends">
        <n-card :bordered="false">
            <n-tabs type="line" animated>
                <n-tab-pane name="ArticlesList" tab="待审核">
                    <article-list></article-list>
                </n-tab-pane>
                <n-tab-pane name="editArticle" tab="已通过">
                    <edit-article></edit-article>
                </n-tab-pane>
            </n-tabs>
        </n-card>
    </div>
</template>

<script setup lang='ts'>
</script>

<style lang='scss' scoped></style>