<template>
    <div id="article-admin">
        <n-card :bordered="false">
            <n-tabs type="line" animated>
                <n-tab-pane name="ArticlesList" tab="文章列表">
                    <article-list></article-list>
                </n-tab-pane>
                <n-tab-pane name="editArticle" tab="编辑文章" id="editArticle">
                    <edit-article></edit-article>
                </n-tab-pane>
            </n-tabs>
        </n-card>
    </div>
</template>

<script setup lang='ts'>
import articleList from './components/articleList.vue';
import editArticle from './components/editArticle.vue';
</script>

<style lang='scss' scoped>

</style>