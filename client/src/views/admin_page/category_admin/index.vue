<template>
    <div id="category">
        <div class="category-header">
            <n-popover placement="bottom" trigger="click">
                <template #trigger>
                    <n-button type="primary" size="small" @click="category_name = ''">添加分类</n-button>
                </template>
                <n-input size="small" v-model:value="category_name" placeholder="请输入分类名称" />
                <div class="save-button" style="display: flex; margin-top: 8px; justify-content: flex-end;">
                    <n-button size="small" type="success" @click="onSaveCategory">保存</n-button>
                </div>
            </n-popover>
        </div>
        <ul class="category-list">
            <li class="category-item" v-for="(__, index) in 15" :key="index">
                <n-card size="small" hoverable>
                    <div class="category-content">
                        <div class="category-item-title">分类标题</div>
                        <div class="category-item-body">
                            <div class="category-item-article-num">文章数: 10086</div>
                        </div>
                        <div class="category-item-actions">
                            <n-space>
                                <n-popover placement="bottom" trigger="click">
                                    <template #trigger>
                                        <n-button type="warning" text @click="getCategory(index)">修改</n-button>
                                    </template>
                                    <n-input size="small" v-model:value="category_name" placeholder="请输入分类名称" />
                                    <div class="save-button"
                                        style="display: flex; margin-top: 8px; justify-content: flex-end;">
                                        <n-button size="small" type="success" @click="onSaveCategory">保存</n-button>
                                    </div>
                                </n-popover>
                                <n-popconfirm @positive-click="deleteCategory(index)">
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

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
const category_name = ref('')
const onSaveCategory = () => {
    console.log('保存分类')
    category_name.value = ''
    getCategories()
}
const getCategory = (id: number) => {
    category_name.value = id.toString()
}
const getCategories = () => {
    console.log('获取分类列表')
}
const deleteCategory = (id: number) => {
    console.log('删除分类', id)
}
onMounted(() => {
    getCategories()
})
</script>

<style lang='scss' scoped>
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
