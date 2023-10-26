<template>
    <div id="category-articles">
        <n-modal v-model:show="showModal">
            <n-card style="width: 800px; height:600px; position: relative;" title="模态框" :bordered="false" size="huge"
                role="dialog" aria-modal="true">
                <n-scrollbar style="max-height: 450px">
                    <ul class="article-list">
                        <li class="article-item" v-for="item in articleList" :key="item.id">
                            <n-card size="small" hoverable @click="toOtherPage(item.id)">
                                <div class="content">
                                    <div class="title">
                                        {{ item.title }}
                                    </div>
                                    <div class="info">
                                        <span>
                                            <n-time format="yyyy-MM-dd" :time="item.create_time"></n-time>
                                        </span>
                                    </div>
                                </div>
                            </n-card>
                        </li>
                    </ul>
                </n-scrollbar>
                <div class="pagination" style=" position: absolute; bottom: 28px;">
                    <n-pagination v-model:page="page" :page-count="count" simple @update:page="handlePageChange" />
                </div>
            </n-card>

        </n-modal>

    </div>
</template>

<script setup lang='ts'>
import { getArticlesByCategoryApi } from '@/apis/category';
import { ref } from 'vue';
const showModal = ref(false)
const page = ref(1);
const pageSize = ref(14);
const count = ref(0);
const tmpId = ref(0)
// 获取分类下的文章
const articleList = ref<any>([]);
const getCategoryIncludesArticles = async (id: number) => {
    console.log(id);
    showModal.value = true
    tmpId.value = id
    const res = await getArticlesByCategoryApi(id, page.value, pageSize.value);
    if (res.code === 200) {
        articleList.value = res.data.list;
        count.value = res.data.total
    }
}
const handlePageChange = (num: number) => {
    page.value = num;
    getCategoryIncludesArticles(tmpId.value);
};
const toOtherPage = (otherId: number) => {
    // 打开新页面
    window.open(`/detail?id=${otherId}`, "_blank");
}

defineExpose({
    getCategoryIncludesArticles
})
</script>

<style lang='scss' scoped>
#category-articles {
    position: relative;

    .pagination {
        position: absolute;
        bottom: -48px;
    }
}

.article-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;

    .article-item {
        cursor: pointer;

        .content {
            display: grid;
            grid-template-columns: 1fr 80px;
            align-items: center;
            gap: 8px;

            .title {
                font-size: 16px;
                font-weight: 600;
                overflow: hidden;
                // 不换行
                white-space: nowrap;
                // 省略号
                text-overflow: ellipsis;
            }
        }
    }
}

// 小于768px时
@media screen and (max-width: 768px) {
    .article-list {
        grid-template-columns: 1fr;
    }
}
</style>