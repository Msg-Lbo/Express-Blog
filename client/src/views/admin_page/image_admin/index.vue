<template>
  <div id="images" @click="hideMenu">
    <n-scrollbar style="max-height: calc(100vh - 128px)" @scroll="handleScroll">
      <div class="container" ref="divContainer"></div>
      <RightKeyMenu :x="x" :y="y" :showMenu="showMenu" :imgSrc="imgSrc" :imgId="imgId" />
    </n-scrollbar>

    <div class="upload-image">
      <n-button type="primary" @click="uploadImage">上传图片</n-button>
      <input type="file" style="display: none" ref="inputImageRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
import RightKeyMenu from "./components/RightKeyMenu.vue";
import { getImageListApi, uploadImageApi } from "@/apis/image";
import { onMounted, onUnmounted, ref } from "vue";
import { httpInstance } from "@/apis";
import { debounce } from "@/utils/debounce";
import { useMessage } from "naive-ui";
document.title = "图片管理";
const page = ref(1);
const pageSize = ref(20);
const count = ref(0);
const imgWidth = 200;
const imageList = ref<any>([]);
const x = ref(0);
const y = ref(0);
const showMenu = ref(false);
const imgSrc = ref("");
const imgId = ref("");
const divContainer = ref();
const inputImageRef = ref();
const message = useMessage();
onMounted(() => {
  createImage();
});

const uploadImage = () => {
  // 限制格式
  inputImageRef.value.accept = "image/*";
  // 多选
  // inputImageRef.value.multiple = true;
  inputImageRef.value.click();
  // 监听input的change事件
  inputImageRef.value.onchange = async (_e: any) => {
    const formData = new FormData();
    for (let i = 0; i < inputImageRef.value.files.length; i++) {
      formData.append("files", inputImageRef.value.files[i]);
    }
    const res = await uploadImageApi(formData);
    if (res.code === 200) {
      message.success(res.msg + "，请刷新页面");
      page.value = 1;
    }
    formData.delete("files");
  };
};
const createImage = async () => {
  const res = await getImageListApi(page.value, pageSize.value);
  if (res.code === 200) {
    count.value = res.data.count;
    imageList.value.push(...res.data.list);
    for (let i = 0; i < imageList.value.length; i++) {
      const img = document.createElement("img");
      img.style.width = imgWidth + "px";
      img.style.transition = "all 0.3s";
      // img.style.borderRadius = "5px";
      img.style.position = "absolute";
      img.style.cursor = "pointer";
      const src = httpInstance.defaults.url + imageList.value[i].url;
      img.src = src;
      img.id = imageList.value[i].image_id;
      // 右键菜单
      img.oncontextmenu = (e) => {
        e.preventDefault();
        imgSrc.value = img.src;
        imgId.value = img.id;
        x.value = e.clientX;
        y.value = e.clientY;
        showMenu.value = true;
      };
      // 左键菜单
      img.onclick = () => {
        showMenu.value = false;
      };
      img.onload = () => setPositions();
      divContainer.value!.appendChild(img);
    }
  }
};
// 计算容器列与间距
const cal = () => {
  const containerWidth = divContainer.value.clientWidth;
  // 计算列数
  const colnums = Math.floor(containerWidth / imgWidth);
  // 计算间距
  const spaceNumber = colnums + 1; // 间距个数
  // 计算剩余空间
  const leftSpace = containerWidth - colnums * imgWidth;
  // 每个空隙的间距
  const space = leftSpace / spaceNumber;
  return {
    space: space,
    colnums: colnums,
  };
};
// 重设图片位置
const setPositions = () => {
  const info = cal(); // 结构赋值
  let nextTops = new Array(info?.colnums); // 创建一个数组，长度为列数
  nextTops.fill(0); // 填充0
  for (let i = 0; i < divContainer.value.children.length; i++) {
    const img = divContainer.value.children[i] as HTMLImageElement;
    const minTop = Math.min.apply(null, nextTops); // 找到nextTops中最小的值
    img.style.top = "0"; // 先设置为0
    img.style.left = "0"; // 先设置为0
    const index = nextTops.indexOf(minTop); // 得到使用的是第几列的top值
    nextTops[index] += img.height + info?.space!;
    const left = (index + 1) * info?.space! + index + index * imgWidth; // 横坐标
    // 使用translate3d来设置值，这样可以使用GPU加速
    img.style.transform = `translate3d(${left}px,${minTop}px,0)`;
  }
  const max = Math.max.apply(null, nextTops); // 求出最大的top值
  divContainer.value.style.height = max + "px"; // 设置容器高度
};
// 滚动回调
const handleScroll = debounce((e: Event) => {
  if (page.value === count.value) return;
  const height = (e.target as HTMLElement).getBoundingClientRect().height;
  const scrollTop = (e.target as HTMLElement).scrollTop;
  const scrollHeight = (e.target as HTMLElement).scrollHeight;
  if (scrollHeight - scrollTop - height < 90) {
    page.value++;
    createImage();
  }
}, 500);
// 防抖
window.onresize = debounce(() => {
  setPositions();
}, 300);
// 卸载
onUnmounted(() => {
  window.onresize = null;
});
const hideMenu = () => {
  showMenu.value = false;
};
</script>

<style lang="scss" scoped>
#images {
  height: calc(100vh - 128px);
  position: relative;
  .container {
    width: 100%;
    position: relative;
  }
  .upload-image {
    position: absolute;
    bottom: 80px;
    right: 50px;
  }
}
</style>
