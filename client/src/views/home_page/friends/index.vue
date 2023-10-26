<template>
  <div id="friends">
    <h1>友情链接</h1>
    <div class="filed-button">
      <n-button @click="handleFiled" type="success" size="small">申请友链</n-button>
    </div>
    <ul class="friends-list">
      <li v-for="link in links" :key="link.id" @click="toFriend(link.link)">
        <div class="friends-item">
          <div class="img">
            <img :src="link.logo" alt="图标没有惹" />
          </div>
          <div class="info">
            <div class="name">{{ link.name }}</div>
            <div class="des">
              <n-ellipsis :line-clamp="1" :tooltip="false">
                {{ link.description }}
              </n-ellipsis>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <add-friend-modal ref="addFriendModalRef" />
  </div>
</template>

<script setup lang="ts">
import addFriendModal from "./components/Model.vue";
import { getFriendByPassApi } from "@/apis/friend";
import { onMounted, ref } from "vue";

interface Link {
  id: number;
  name: string;
  link: string;
  logo: string;
  description: string;
}

onMounted(() => {
  getLinks();
  document.title = "一楼没太阳 | 友情链接";
});
const toFriend = (link: string) => {
  window.open(link, "_blank");
};
// 获取已经通过审核的友链
const links = ref<Link[]>([]);
const getLinks = async () => {
  const res = await getFriendByPassApi();
  if (res.code === 200) {
    links.value = res.data;
  }
};
const addFriendModalRef = ref();
const handleFiled = () => {
  addFriendModalRef.value.showModalFn();
};
</script>

<style lang="scss" scoped>
#friends {
  .filed-button {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }
  .friends-list {
    display: grid;
    // 小于 800px 一列，大于 800px 两列, 最小宽度 300px, 最大宽度 1fr
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 8px;

    .friends-item {
      display: flex;
      align-items: space-between;
      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(189, 195, 202, 0.15) 0px 0px 0px 1px;
      transition: box-shadow 0.3s ease-in-out;
      cursor: pointer;

      &:hover {
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .name {
          font-size: 20px;
          font-weight: bold;
        }
      }

      .img {
        width: 60px;
        height: 60px;
        border-radius: 8px 0 0 8px;
        overflow: hidden;
        margin-right: 8px;

        img {
          width: 60px;
          height: 60px;
          margin-right: 8px;
        }
      }
    }
  }
}

// 宽度小于 768px 时
@media screen and (max-width: 768px) {
  #friends {
    ::v-deep(.n-scrollbar) {
      max-height: 460px !important;
    }
  }
}
</style>
