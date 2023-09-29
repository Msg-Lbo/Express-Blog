<template>
    <div id="article-list">
        <n-scrollbar style="max-height: 860px">
            <ul class="card-list">
                <li class="card-item" v-for="(__, index) in 14" :key="index">
                    <n-card title="小卡片" size="small" hoverable>
                        <div class="content">
                            <div class="description">
                                <n-ellipsis :line-clamp="1" :tooltip="false">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum quas quisquam veniam
                                    est,
                                    quibusdam id obcaecati sequi, sit quia nam ipsam enim totam. Animi debitis autem earum
                                    eaque
                                    quae officia!
                                </n-ellipsis>
                            </div>
                            <div class="info">
                                <n-space>
                                    <span class="time icon">
                                        <n-icon size="15">
                                            <time-icon />
                                        </n-icon>
                                        <span>2021-10-10</span>
                                    </span>
                                    <span class="comment icon">
                                        <n-icon size="15">
                                            <msg-icon />
                                        </n-icon>
                                        <span>10086</span>
                                    </span>
                                    <span class="view icon">
                                        <n-icon size="15">
                                            <view-icon />
                                        </n-icon>
                                        <span>10086</span>
                                    </span>
                                </n-space>
                            </div>
                        </div>
                    </n-card>
                </li>
            </ul>
        </n-scrollbar>

        <div class="pagination">
            <n-pagination v-model:page="page" :page-count="100" simple />
        </div>
    </div>
</template>

<script setup lang='ts'>
import {
    AccessTimeOutlined as timeIcon,
    MessageOutlined as msgIcon,
    RemoveRedEyeOutlined as viewIcon,
} from '@vicons/material'
import { ref } from 'vue'
const page = ref(1)
</script>

<style lang='scss' scoped>
#article-list {
    .pagination {
        margin-top: 8px;
    }
}

.card-list {
    display: grid;
    // 小于 800px 一列，大于 800px 两列
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 8px;

    .card-item {
        cursor: pointer;
        ::v-deep(.n-card-header__main) {
            font-size: 16px;
            font-weight: bold;
        }


        .icon {
            display: flex;
            align-items: center;
        }
    }
}
// 小于768px时，一列
@media screen and (max-width: 768px) {
    #article-list{
        ::v-deep(.n-scrollbar){
            max-height: 460px !important;
        }
    }
    .card-list {
        grid-template-columns: 1fr;
    }
}
</style>