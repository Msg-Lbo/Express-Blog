<template>
  <div id="category">
    <div class="category-header">
      <n-popover placement="bottom" trigger="click">
        <template #trigger>
          <n-button type="primary" size="small" @click="category_name = ''">添加分类</n-button>
        </template>
        <n-input size="small" v-model:value="category_name" placeholder="请输入分类名称" />
        <div class="save-button" style="display: flex; margin-top: 8px; justify-content: flex-end">
          <n-button size="small" type="success" @click="onAddCategory">保存</n-button>
        </div>
      </n-popover>
    </div>
    <ul class="category-list">
      <li class="category-item" v-for="item in categoryList" :key="item.id">
        <n-card size="small" hoverable>
          <div class="category-content">
            <div class="category-item-title">{{ item.category_name }}</div>
            <div class="category-item-body">
              <div class="category-item-article-num">文章数: {{ item.article_count }}</div>
            </div>
            <div class="category-item-actions">
              <n-space>
                <n-popover placement="bottom" trigger="click">
                  <template #trigger>
                    <n-button type="warning" text @click="editCategory(item.category_name)">修改</n-button>
                  </template>
                  <n-input size="small" v-model:value="category_name" placeholder="请输入分类名称" />
                  <div class="save-button" style="display: flex; margin-top: 8px; justify-content: flex-end">
                    <n-button size="small" type="success" @click="updateCategory(item.id)">保存</n-button>
                  </div>
                </n-popover>
                <n-popconfirm @positive-click="deleteCategory(item.id)">
                  <template #trigger>
                    <n-button type="error" text>删除</n-button>
                  </template>
                  删除后,分类中的文章将会被移动到默认分类中
                </n-popconfirm>
              </n-space>
            </div>
          </div>
        </n-card>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getAllCategoryApi, updateCategoryApi, deleteCategoryApi, addCategoryApi } from "@/apis/category";
import { useMessage } from "naive-ui";
import { onMounted, ref } from "vue";
const category_name = ref("");
const message = useMessage();
document.title="分类管理"
// 保存分类
const onAddCategory = async () => {
  const res = await addCategoryApi(category_name.value);
  if (res.code === 200) {
    message.success(res.msg);
    category_name.value = "";
    getCategories();
  }
};
// 修改分类
const editCategory = (name: string) => {
  category_name.value = name;
};
const updateCategory = async (id: number) => {
  const res = await updateCategoryApi(id, category_name.value);
  if (res.code === 200) {
    message.success(res.msg);
    getCategories();
  }
};
// 获取分类列表
const categoryList = ref<any>([]);
const getCategories = async () => {
  const res = await getAllCategoryApi();
  if (res.code === 200) {
    categoryList.value = res.data;
  }
};
// 删除分类
const deleteCategory = async (id: number) => {
  const res = await deleteCategoryApi(id);
  if (res.code === 200) {
    message.success(res.msg);
    getCategories();
  }
};
onMounted(() => {
  getCategories();
});
</script>

<style lang="scss" scoped>
#category {
  padding: 24px;

  .category-header {
    margin-bottom: 24px;
  }
}

.category-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 8px;

  .category-item {
    cursor: pointer;

    .category-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
