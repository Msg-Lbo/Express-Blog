<template>
  <div id="detail">
    <div class="article-container">
      <div class="content" ref="containerRef">
        <h1 style="text-align: center">{{ articleDetail?.title }}</h1>
        <n-scrollbar style="max-height: calc(100vh - 40px - 45px)">
          <MdPreview :editorId="pId" :modelValue="articleDetail?.content" :theme="theme" previewTheme="github" />
        </n-scrollbar>
      </div>
      <div class="right-bar">
        <div class="catalog">
          <n-card size="small" :bordered="false" hoverable>
            <h3>目录</h3>
            <n-scrollbar style="max-height: calc(100vh - 460px)">
              <MdCatalog :editorId="pId" :scrollElement="scrollElement" @click="handleClickCatalog" />
            </n-scrollbar>
          </n-card>
        </div>
        <div class="actions">
          <n-button :disabled="!articleDetail?.pre_id" @click="toOtherPage(articleDetail?.pre_id!)">上一篇</n-button>
          <n-button :disabled="!articleDetail?.next_id" @click="toOtherPage(articleDetail?.next_id!)">下一篇</n-button>
          <n-button @click="showCommentsContainer">评论列表</n-button>
        </div>
      </div>
    </div>
    <comments ref="commentsContainer" />
  </div>
</template>

<script setup lang="ts">
import Comments from "./components/comments.vue";
import { getArticleDetailApi } from "@/apis/article";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { MdPreview, MdCatalog } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { useThemeStore } from "@/store/theme";
import { TocItem } from "md-editor-v3/lib/types/MdCatalog/MdCatalog";
import router from "@/router";
const route = useRoute();
const id = ref(route.query.id as string);
const containerRef = ref<HTMLElement | undefined>(undefined);
const themeStore = useThemeStore();
const theme = ref<any>(themeStore.$state.theme);
watch(themeStore.$state, (_oldVal, newVal) => {
  theme.value = newVal.theme;
});
interface Detail {
  id: number;
  title: string;
  description: string;
  content: string;
  category_name: string;
  create_time: number;
  update_time: number;
  pre_id: number;
  next_id: number;
}
const pId = "preview-only";
const scrollElement = ref();
const articleDetail = ref<Detail>();
// 获取文章详情
const getArticleDetail = async () => {
  const res = await getArticleDetailApi(id.value);
  if (res.code === 200) {
    articleDetail.value = res.data;
  }
};
// 跳转到其他页面
const toOtherPage = (otherId: number) => {
  console.log(id.value, otherId);

  // 修改路由参数
  router.push({
    path: "/detail/",
    query: {
      id: otherId,
    },
  });
  id.value = otherId.toString();
  getArticleDetail();
};
// 点击目录
const handleClickCatalog = (e: MouseEvent, t: TocItem) => {
  // t.active = true;
  e.preventDefault();
  const el = document.getElementById(t.text);
  if (el) {
    scrollElement.value.scrollTo({
      top: el.offsetTop - 20,
      behavior: "smooth",
    });
  }
};
const commentsContainer = ref();
const showCommentsContainer = () => {
  commentsContainer.value.show();
};
onMounted(() => {
  getArticleDetail();
  scrollElement.value = document.querySelector(".content .n-scrollbar .n-scrollbar-container");
});
</script>

<style lang="scss" scoped>
#detail {
  .article-container {
    display: flex;
    justify-content: space-between;

    .content {
      width: 78%;
    }

    .right-bar {
      width: 20%;
      padding-top: 65px;

      .catalog {
        height: calc(100vh - 400px);

        ::v-deep(.n-card) {
          height: 100%;
        }
      }

      .actions {
        margin-top: 50px;

        ::v-deep(.n-button) {
          width: 100%;
          margin-bottom: 10px;
        }
      }
    }
  }
}

// 小于 1200px
@media screen and (max-width: 1200px) {
  #detail {
    .article-container {
      .content {
        width: 100%;
      }

      .right-bar {
        display: none;
      }
    }
  }
}

// 小于 768px
@media screen and (max-width: 768px) {
  #detail {
    .article-container {
      ::v-deep(.n-scrollbar) {
        max-height: calc(100vh - 120px) !important;
      }
    }
  }
}
</style>
