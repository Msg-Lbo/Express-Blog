<template>
  <div id="article-admin">
    <n-card :bordered="false">
      <n-tabs type="line" :value="selectTabs" @update:value="handleChange" animated>
        <n-tab-pane name="ArticlesList" tab="文章列表">
          <article-list @selectTabs="handleSelectTabs"></article-list>
        </n-tab-pane>
        <n-tab-pane name="editArticle" tab="编辑文章">
          <edit-article :articleData="articleData"></edit-article>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import articleList from "./components/articleList.vue";
import editArticle from "./components/editArticle.vue";
const selectTabs = ref();

// 切换tab
const handleChange = (tab: string) => {
  // 如果手动切换tab，清空文章数据
  if (tab === "editArticle") {
    articleData.value = undefined;
  }
  selectTabs.value = tab;
};

// 选中文章列表中的文章，切换到编辑文章tab
const articleData = ref<any>();
const handleSelectTabs = (data: any) => {
  handleChange("editArticle");
  articleData.value = data.data;
};
</script>

<style lang="scss" scoped>
#article-admin {
  ::v-deep(.n-card) {
    background-color: transparent;
  }
}
</style>
