<template>
  <div class="right-key-menu" v-show="showMenu" :style="{ top: y + 'px', left: x + 'px' }">
    <n-card size="small">
      <div class="menu-item" @click="viewImage">查看</div>
      <div class="menu-item" @click="copyLink">复制链接</div>
      <div class="menu-item" @click="deleteImage">删除</div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { deleteImageApi } from "@/apis/image";
import { useMessage } from "naive-ui";
const message = useMessage();
const props = defineProps({
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  showMenu: {
    type: Boolean,
    default: false,
  },
  imgSrc: {
    type: String,
    default: "",
  },
  imgId: {
    type: String,
    default: "",
  },
});

const viewImage = () => {
  window.open(props.imgSrc);
};
const deleteImage = async () => {
  const res = await deleteImageApi(props.imgId);
  if (res.code === 200) {
    message.success(`${res.msg},请手动刷新页面获取最新数据`);
  }
};
const copyLink = () => {
  navigator.clipboard.writeText(props.imgSrc).then(()=>{
    message.success('复制成功')
  },()=>{
    message.error('复制失败')
  })
};
</script>

<style scoped>
.right-key-menu {
  position: fixed;
  z-index: 9999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.1s ease-in-out;
}

.menu-item {
  padding: 5px 20px;
  cursor: pointer;
}
</style>
