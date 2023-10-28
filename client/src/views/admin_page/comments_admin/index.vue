<template>
  <div id="comments">
    <n-table :single-line="false" size="small" striped>
      <thead>
        <tr>
          <th class="center">发布者昵称</th>
          <th>评论内容</th>
          <th>来自文章</th>
          <th class="email center">发布者邮箱</th>
          <!-- <th class="ip center">IP</th>
          <th class="address center">地址</th> -->
          <th class="create_time center">时间</th>
          <th class="center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in comments" :key="item.id">
          <td class="nickname center">{{ item.nickname }}</td>
          <td class="content">
            <n-ellipsis style="max-width: 300px" :tooltip="false">
              {{ item.content }}
            </n-ellipsis>
          </td>
          <td class="for-article">
            <n-ellipsis style="max-width: 200px" :tooltip="false">
              {{ item.article_title }}
            </n-ellipsis>
          </td>
          <td class="email center">
            <n-ellipsis style="max-width: 150px" :tooltip="false">
              {{ item.email }}
            </n-ellipsis>
          </td>
          <!-- <td class="ip center">{{ item.ip }}</td>
          <td class="address center">{{ item.address }}</td> -->
          <td class="create_time center">
            <n-ellipsis style="max-width: 150px" :tooltip="false">
              <n-time :time="item.date" />
            </n-ellipsis>
          </td>
          <td class="actions center">
            <n-space justify="center">
              <n-button type="warning" text>封禁</n-button>
              <n-popconfirm @positive-click="deleteComment(item.id)">
                  <template #trigger>
                    <n-button type="error" text>删除</n-button>
                  </template>
                  删除后,该评论下的所有回复将会被删除
                </n-popconfirm>
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>
    <div class="pagination">
      <n-pagination v-model:page="page" :page-count="total" @update:page="handlePageChange" simple />
    </div>
  </div>
</template>

<script setup lang="ts">
import { deleteCommentApi, getAllCommentApi } from "@/apis/comment";
import { useMessage } from "naive-ui";
import { ref } from "vue";
const page = ref(1);
const pageSize = ref(15);
const total = ref(100);
const message = useMessage()
const comments = ref<any>([]);
document.title='评论管理'
// 获取所有评论
const getAllComments = async () => {
  const res = await getAllCommentApi(page.value, pageSize.value);
  if (res.code === 200) {
    comments.value = res.data;
    total.value = res.total;
  }
};
getAllComments();
// 删除评论
const deleteComment = async (id: number) => {
  const res = await deleteCommentApi(id);
  if (res.code === 200) {
    message.success(res.msg);
    getAllComments();
  }
};
// 分页
const handlePageChange = (num: number) => {
  page.value = num;
  getAllComments();
};
</script>

<style lang="scss" scoped>
#comments {
  padding: 24px;

  .center {
    text-align: center;
  }

  .content {
    max-width: 300px;
  }

  .nickname {
    width: 100px;
  }

  .for-article {
    width: 200px;
  }

  .email,
  .ip,
  .address,
  .create_time {
    width: 150px;
  }

  .actions {
    width: 100px;
  }
}

//  宽度低于 1380px并且大于 800px 时
@media screen and (max-width: 1380px) {
  #comments {
    .create_time {
      display: none;
    }
  }
}

// 宽度低于1168px时
@media screen and (max-width: 1168px) {
  #comments {
    .email,
    .ip,
    .address {
      display: none;
    }
  }
}
</style>
