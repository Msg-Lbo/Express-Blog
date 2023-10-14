<template>
  <div id="archives">
    <n-scrollbar style="max-height: 860px" @scroll="handleScroll">
      <div class="archives-container">
        <n-timeline size="large">
          <n-timeline-item content="嗯?" />
          <n-timeline-item
            v-for="item in articleList"
            type="success"
            :content="item.title"
            :time="timestampToTime(item.create_time)"
            :key="item.id"
          />
          <n-timeline-item type="warning" v-if="page >= count" content="没有了啦,别翻了" />
          <n-timeline-item type="info" v-else content="等一等,还有一点点" />
        </n-timeline>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { getAllArticleApi } from "@/apis/article";
import { debounce } from "@/utils/debounce";
import { onMounted, ref } from "vue";
const page = ref(1);
const pageSize = ref(25);
const count = ref(0);
onMounted(() => {
  getArticleList();
});

const handleScroll = debounce((e: Event) => {
  if (page.value === count.value) return;
  const height = (e.target as HTMLElement).getBoundingClientRect().height;
  const scrollTop = (e.target as HTMLElement).scrollTop;
  const scrollHeight = (e.target as HTMLElement).scrollHeight;
  if (scrollHeight - scrollTop - height < 90) {
    page.value++;
    getArticleList();
  }
}, 500);

// 获取文章列表
const articleList = ref<any>([]);
const getArticleList = async () => {
  const res = await getAllArticleApi(page.value, pageSize.value);
  articleList.value.push(...res.data.list);
  count.value = res.data.total;
};

// 时间戳转换
const timestampToTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const Y = date.getFullYear() + "-";
  const M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
  const D = date.getDate() + " ";
  return Y + M + D;
};
</script>

<style lang="scss" scoped>
#archives {
  .archives-container {
  }
}

// 小于768px时
@media screen and (max-width: 768px) {
  #archives {
  }
}
</style>
