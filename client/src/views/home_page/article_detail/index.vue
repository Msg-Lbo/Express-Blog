<template>
  <div id="detail">
    <div class="article-container">
      <div class="content" ref="containerRef">
        <h1 style="text-align: center">{{ articleDetail?.title }}</h1>
        <n-scrollbar style="max-height: calc(100vh - 40px - 45px)">
          <MdPreview :editorId="pId" :modelValue="articleDetail?.content" :theme="theme" previewTheme="github" />
        </n-scrollbar>
      </div>
      <div class="catalog">
        <MdCatalog :editorId="pId" :scrollElement="scrollElement" @click="handleClickCatalog" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticleDetailApi } from "@/apis/article";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { MdPreview, MdCatalog } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { useThemeStore } from "@/store/theme";
import { TocItem } from "md-editor-v3/lib/types/MdCatalog/MdCatalog";
const route = useRoute();
const id = route.query.id as string;
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
}
const pId = "preview-only";
const scrollElement = ref();
const articleDetail = ref<Detail>();
const getArticleDetail = async () => {
  const res = await getArticleDetailApi(id);
  if (res.code === 200) {
    articleDetail.value = res.data;
  }
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
onMounted(() => {
  getArticleDetail();
  scrollElement.value = document.querySelector(".content .n-scrollbar .n-scrollbar-container");
});
</script>

<style lang="scss" scoped>
#detail {
  .article-container {
    display: flex;
    .content,
    .catalog {
      width: 100%;
    }
  }
}

// 小于 1200px
@media screen and (max-width: 1200px) {
  #detail {
    .article-container {
      .catalog {
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
