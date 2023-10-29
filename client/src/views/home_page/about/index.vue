<template>
  <div id="about">
    <n-scrollbar style="max-height: calc(100vh - 40px - 45px)">
      <MdPreview :modelValue="content" :theme="theme" previewTheme="github" />
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { useThemeStore } from "@/store/theme";
import { ref, watch } from "vue";
const themeStore = useThemeStore();
const theme = ref<any>(themeStore.$state.theme);
watch(themeStore.$state, (_oldVal, newVal) => {
  theme.value = newVal.theme;
});

const content = `## 暂时还没得嘛`

</script>

<style lang="scss" scoped></style>
