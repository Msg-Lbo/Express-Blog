<template>
  <div id="archives">
    <n-scrollbar style="max-height: 860px" @scroll="handleScroll">
      <div class="archives-container">
        <div class="warp">
          <div class="box" v-for="item in articleList" :key="item.id">
            <div class="box-content">
              <n-card size="small" style="border-radius: 8px" hoverable>
                <div class="title">
                  {{ item.title }}
                </div>
                <div class="time">
                  <n-time :time="item.create_time" />
                </div>
              </n-card>
            </div>
          </div>
        </div>
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
</script>

<style lang="scss" scoped>
#archives {
  .archives-container {
    display: flex;
    justify-content: center;
    // margin: 0 auto;

    .warp {
      .box {
        width: auto;
        padding: 10px 20px;
        cursor: pointer;
        &:nth-child(odd) {
          position: relative;
          left: 50%;
          &::after {
            position: absolute;
            content: "";
            left: 8px;
            width: 3px;
            height: 100%;
            background-color: var(--n-border-color);
            transform: translate(-9.5px, -100%);
          }
          .box-content {
            text-align: left;
          }
        }
        &:nth-child(even) {
          position: relative;
          left: -50%;
          &::after {
            position: absolute;
            content: "";
            right: 8px;
            width: 3px;
            height: 100%;
            background-color: var(--n-border-color);
            transform: translate(9.5px, -100%);
          }
          .box-content {
            text-align: right;
          }
        }
      }
    }
  }
}

// 小于768px时
@media screen and (max-width: 768px) {
  #archives {
    width: 100vw;
  }
}
</style>
