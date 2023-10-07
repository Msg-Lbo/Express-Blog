<template>
  <div id="archives">
    <n-scrollbar style="max-height: 860px" @scroll="handleScroll">
      <n-timeline size="large">
        <n-timeline-item content="嗯?" />
        <n-timeline-item
          type="success"
          content="哪里成功"
          time="2018-04-03 20:46"
          v-for="(__, index) in page"
          :key="index"
        />
        <n-timeline-item type="warning" v-if="page >= 30" content="没有了啦,别翻了" />
        <n-timeline-item type="info" v-else content="等一等,还有一点点" />
      </n-timeline>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { debounce } from "@/utils/debounce";
import { ref } from "vue";
const page = ref(25);
const handleScroll = debounce((e: Event) => {
  if (page.value === 30) return;
  const height = (e.target as HTMLElement).getBoundingClientRect().height;
  const scrollTop = (e.target as HTMLElement).scrollTop;
  const scrollHeight = (e.target as HTMLElement).scrollHeight;
  if (scrollHeight - scrollTop - height < 90) {
    console.log("到底了");
    page.value += 5;
    if (page.value > 30) {
      page.value = 30;
    }
  }
}, 500);
</script>

<style lang="scss" scoped>
// 小于768px时
@media screen and (max-width: 768px) {
  #archives {
    ::v-deep(.n-scrollbar) {
      max-height: 460px !important;
    }
  }
}
</style>
