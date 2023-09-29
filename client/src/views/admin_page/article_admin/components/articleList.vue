<template>
    <div id="article-list">
        <n-table :single-line="false" striped>
            <thead>
                <tr>
                    <th class="title">文章标题</th>
                    <th class="des">文章描述</th>
                    <th class="create-time center">发布时间</th>
                    <th class="update-time center">修改时间</th>
                    <th class="actions center">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(__, index) in 13" :key="index">
                    <td class="title">放弃</td>
                    <td class="des">反常的</td>
                    <td class="create-time center">
                        2021-01-01 00:00:00
                    </td>
                    <td class="update-time center">
                        2023-01-01 00:00:00
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
        <div class="pagination">
            <n-pagination v-model:page="page" :page-count="100" simple />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const page = ref(1);

</script>

<style lang='scss' scoped>
#article-admin {
    height: 100%;

    ::v-deep(.n-card) {
        height: calc(100vh - 64px - 64px);
    }

    .center {
        text-align: center;
    }

    .update-time,
    .create-time {
        width: 150px;
    }

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