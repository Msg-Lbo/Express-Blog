<template>
  <div id="waiting">
    <n-scrollbar style="max-height: calc(100vh - 266px)">
      <ul class="friends-list">
        <li class="friends-item" v-for="item in friends" :key="item.id">
          <n-card size="small" embedded>
            <div class="content">
              <div class="logo">
                <img :src="item.logo" alt="logo不见了" />
              </div>
              <div class="info">
                <div class="name">{{ item.name }}</div>
                <div class="description">
                  <n-ellipsis :line-clamp="1">
                    {{ item.description }}
                  </n-ellipsis>
                </div>
              </div>
              <div class="actions">
                <n-space justify="center">
                  <n-button type="success" text @click="allowFriend(item.id)">通过</n-button>
                  <n-popover placement="bottom" trigger="click">
                    <template #trigger>
                      <n-button type="error" text>驳回</n-button>
                    </template>
                    <n-form-item label="请输入驳回理由">
                      <n-input type="textarea" placeholder="理由..." v-model:value="reason" />
                    </n-form-item>
                    <div class="refuse-button">
                      <n-button @click="refuseFriend(item.id)" type="error" text>提交</n-button>
                    </div>
                  </n-popover>
                </n-space>
              </div>
            </div>
          </n-card>
        </li>
      </ul>
    </n-scrollbar>
    <div class="pagination">
      <n-pagination v-model:page="page" :page-count="100" simple />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getFriendApi, allowFriendApi, refuseFriendApi } from "@/apis/friend";
import { useMessage } from "naive-ui";
const page = ref(1);
const message = useMessage();
const reason = ref("");
// 获取指定状态友链
const friends = ref<any>([]);
const getFriends = async (status: number) => {
  const res = await getFriendApi(status);
  if (res.code === 200) {
    friends.value = res.data;
  }
};
getFriends(0);

// 通过友链
const allowFriend = async (id: number) => {
  const res = await allowFriendApi(id);
  if (res.code === 200) {
    message.success(res.msg);
    getFriends(0);
  }
};

// 驳回友链
const refuseFriend = async (id: number) => {
  const res = await refuseFriendApi(id, reason.value);
  if (res.code === 200) {
    message.success(res.msg);
    getFriends(0);
  }
};
</script>

<style lang="scss" scoped>
#waiting {
  .friends-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
    grid-gap: 5px;

    .friends-item {
      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .logo {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .info {
          flex: 1;
          padding: 0 8px;

          .name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 8px;
          }

          .description {
            font-size: 14px;
            color: #666;
          }
        }
      }
    }
  }

  .pagination {
    margin-top: 16px;
    text-align: center;
  }
}
</style>
