<template>
    <div id="passed">
        <n-scrollbar style="max-height: calc(100vh - 266px)">
            <ul class="friends-list">
                <li class="friends-item" v-for="(__, index) in 10" :key="index">
                    <n-card size="small" embedded>
                        <div class="content">
                            <div class="logo">
                                <img src="http://q1.qlogo.cn/g?b=qq&nk=24130801&s=100" alt="">
                            </div>
                            <div class="info">
                                <div class="name">Lorem ipsum dolor sit amet.</div>
                                <div class="description">
                                    <n-ellipsis :line-clamp="1">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste,
                                        tenetur?
                                    </n-ellipsis>
                                </div>
                            </div>
                            <div class="actions">
                                <n-space justify="center">
                                    <n-button type="error" text>删除</n-button>
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
import { ref } from 'vue'
const page = ref(1)
</script>

<style lang='scss' scoped>
#passed {
    .friends-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
        grid-gap: 5px;

        .friends-item {

            .content {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .logo {
                    width: 50px;
                    height: 50px;
                    border-radius: 8px;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }

                .info {
                    flex: 1;
                    padding: 0 8px;

                    .name {
                        font-size: 18px;
                        font-weight: bold;
                        margin-bottom: 8px;
                    }

                    .description {
                        font-size: 14px;
                        color: #666;
                    }
                }
            }
        }
    }

    .pagination {
        margin-top: 16px;
        text-align: center;
    }
}
</style>