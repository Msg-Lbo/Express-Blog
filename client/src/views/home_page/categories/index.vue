<template>
  <div id="categories">
    <n-scrollbar style="max-height: calc(100vh - 80px)">
      <ul class="card-list">
        <li class="card-item" v-for="item in categoryList" :key="item.id">
          <n-card size="small" hoverable>
            <div class="content">
              <div class="category-name">{{ item.category_name }}</div>
              <div class="info">
                {{ item.article_count }}
              </div>
            </div>
          </n-card>
        </li>
      </ul>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { getAllCategoryApi } from "@/apis/category";
import { ref } from "vue";

// 获取分类列表
const categoryList = ref<any>([]);
const getCategoryList = async () => {
  const res = await getAllCategoryApi();
  categoryList.value = res.data;
};
getCategoryList();
</script>

<style lang="scss" scoped>
#categories{
  height: calc(100vh - 80px);
}
.card-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;

  .card-item {
    cursor: pointer;

    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

// 小于768px时
@media screen and (max-width: 768px) {
  #categories {
    height: auto;
    ::v-deep(.n-scrollbar) {
      max-height: 460px !important;
    }
  }
}
</style>
