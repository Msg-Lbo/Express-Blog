<template>
    <div id="article-list">
        <n-scrollbar style="max-height: calc(100vh - 266px)">
            <n-table :single-line="false" striped>
                <thead>
                    <tr>
                        <th class="title">文章标题</th>
                        <th class="des">文章描述</th>
                        <th class="category">归属分类</th>
                        <th class="comment-num center">评论数</th>
                        <th class="create-time center">发布时间</th>
                        <th class="update-time center">修改时间</th>
                        <th class="actions center">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in articleList" :key="item.id">
                        <td class="title">{{ item.title }}</td>
                        <td class="des">{{ item.description }}</td>
                        <td class="category">{{ item.category_name }}</td>
                        <td class="comment-num center">10086</td>
                        <td class="create-time center">
                            <n-time :time="item.create_time"></n-time>
                        </td>
                        <td class="update-time center">
                            <n-time :time="item.update_time"></n-time>
                        </td>
                        <td class="actions center">
                            <n-space justify="center">
                                <n-button type="warning" text>修改</n-button>
                                <n-button type="error" text>删除</n-button>
                            </n-space>
                        </td>
                    </tr>
                </tbody>
            </n-table>
        </n-scrollbar>
        <div class="pagination">
            <n-pagination v-model:page="page" :page-count="total" simple />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { getAllArticleApi } from '@/apis/article';
const page = ref(1);
const pageSize = ref(13);
const total = ref(100);
const articleList = ref<any>([]);
const getAllarticle = async () => {
    const res = await getAllArticleApi(page.value, pageSize.value);
    if (res.code === 200) {
        console.log(res.data);
        articleList.value = res.data.list;
        total.value = res.data.total;
    }
}
getAllarticle()
</script>

<style lang='scss' scoped>
#article-admin {
    height: 100%;

    ::v-deep(.n-card) {
        background-color: transparent;
    }

    .center {
        text-align: center;
    }

    .update-time,
    .create-time {
        width: 150px;
    }

    .comment-num,
    .actions {
        width: 100px;
    }

    .pagination {
        margin-top: 16px;
        text-align: center;
    }
}

// 宽度小于800px时，表格的样式
@media screen and (max-width: 800px) {
    #article-admin {

        .des,
        .comment-num,
        .update-time,
        .create-time,
        .actions {
            display: none;
        }

        .actions {
            width: 50px;
        }
    }
}
</style>