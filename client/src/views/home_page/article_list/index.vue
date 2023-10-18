<template>
  <div id="article-list">
    <n-scrollbar style="max-height: calc(100vh - 80px)">
      <ul class="card-list">
        <li class="card-item" v-for="item in articleList" :key="item.id" @click="toArticle(item.id)">
          <n-card :title="item.title" size="small" hoverable>
            <div class="content">
              <div class="description">
                <n-ellipsis :line-clamp="1" :tooltip="false">
                  {{ item.description }}
                </n-ellipsis>
              </div>
              <div class="info">
                <n-space justify="end">
                  <span class="time icon">
                    <n-icon size="15">
                      <time-icon />
                    </n-icon>
                    <n-time format="yyyy-MM-dd" :time="item.create_time"></n-time>
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
                  <span class="category icon">
                    <n-icon size="15">
                      <category-icon />
                    </n-icon>
                    <span>{{ item.category_name }}</span>
                  </span>
                </n-space>
              </div>
            </div>
          </n-card>
        </li>
      </ul>
    </n-scrollbar>

    <div class="pagination">
      <n-pagination v-model:page="page" :page-count="count" simple @update:page="handlePageChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllArticleApi } from "@/apis/article";
import router from "@/router";
import {
  CategoryOutlined as categoryIcon,
  AccessTimeOutlined as timeIcon,
  MessageOutlined as msgIcon,
  RemoveRedEyeOutlined as viewIcon,
} from "@vicons/material";
import { ref } from "vue";
const page = ref(1);
const pageSize = ref(14);
const count = ref(0);
// 获取文章列表
const articleList = ref<any>([]);
const getArticleList = async () => {
  const res = await getAllArticleApi(page.value, pageSize.value);
  if (res.code === 200) {
    articleList.value = res.data.list;
    count.value = res.data.total;
  }
};

// 切换页码
const handlePageChange = (num: number) => {
  page.value = num;
  getArticleList();
};
getArticleList();

// 到文章
const toArticle = (id: number) => {
  router.push({
    path: "/detail/",
    query: {
      id,
    },
  });
};
</script>

<style lang="scss" scoped>
#article-list {
  position: relative;
  .pagination {
    position: absolute;
    bottom: -48px;
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
// 小于1200px时
@media screen and (max-width: 1200px) {
  #article-list {
    ::v-deep(.n-scrollbar) {
      max-height: 640px !important;
    }
  }
  .card-list {
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  }
}

// 小于768px时，一列
@media screen and (max-width: 768px) {
  #article-list {
    ::v-deep(.n-scrollbar) {
      max-height: 460px !important;
    }
  }
  .card-list {
    grid-template-columns: 1fr;
  }
}
</style>
