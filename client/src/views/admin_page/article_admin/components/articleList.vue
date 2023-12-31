<template>
  <div id="article-list">
    <n-scrollbar style="max-height: calc(100vh - 266px)">
      <n-table :single-line="false" striped size="small">
        <thead>
          <tr>
            <th class="title">文章标题</th>
            <th class="des">文章描述</th>
            <th class="category">归属分类</th>
            <th class="comment-num center">评论数</th>
            <th class="create-time center">发布时间</th>
            <th class="update-time center">修改时间</th>
            <th class="actions center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in articleList" :key="item.id">
            <td class="title">
                {{ item.title }}
            </td>
            <td class="des">
                {{ item.description }}
            </td>
            <td class="category">{{ item.category_name }}</td>
            <td class="comment-num center">{{ item.comment_count }}</td>
            <td class="create-time center">
                <n-time :time="item.create_time"></n-time>
            </td>
            <td class="update-time center">
                <n-time :time="item.update_time"></n-time>
            </td>
            <td class="actions center">
              <n-space justify="center">
                <n-button type="warning" text @click="handleEdit(item)">修改</n-button>
                <n-popconfirm @positive-click="deleteArticle(item.id)">
                  <template #trigger>
                    <n-button type="error" text>删除</n-button>
                  </template>
                  删除后,分类中的文章将会被移动到默认分类中
                </n-popconfirm>
              </n-space>
            </td>
          </tr>
        </tbody>
      </n-table>
    </n-scrollbar>
    <div class="pagination">
      <n-pagination v-model:page="page" :page-count="total" @update:page="handlePageChange" simple />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { deleteArticleApi, getAllArticleApi } from "@/apis/article";
import { useMessage } from "naive-ui";
const page = ref(1);
const pageSize = ref(17);
const total = ref(100);
const articleList = ref<any>([]);
const message = useMessage();
document.title="文章列表"
const getAllarticle = async () => {
  const res = await getAllArticleApi(page.value, pageSize.value);
  if (res.code === 200) {
    console.log(res.data);
    articleList.value = res.data.list;
    total.value = res.data.total;
  }
};
getAllarticle();

// 编辑文章,传入文章详细信息
const handleEdit = (item: any) => {
  selectTabs(item);
};
// 使用defineEmits定义事件, 使用emits触发事件,向父组件传递数据
const emits = defineEmits(["selectTabs"]);
// 接受ID,触发事件,向父组件发送数据
const selectTabs = (data: any) => {
  emits("selectTabs", {
    data: data,
  });
};
// 删除文章
const deleteArticle = async (id: number) => {
  const res = await deleteArticleApi(id);
  if (res.code === 200) {
    message.success(res.msg);
    getAllarticle();
  }
};
// 切换页码
const handlePageChange = (num: number) => {
  page.value = num;
  getAllarticle();
};
</script>

<style lang="scss" scoped>
#article-admin {
  .title{
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .des {
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .center {
    text-align: center;
  }

  .update-time,
  .create-time {
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }

  .comment-num,
  .actions {
    width: 100px;
  }

  .pagination {
    margin-top: 16px;
    text-align: center;
  }
}

// 宽度小于1000px时，表格的样式
@media screen and (max-width: 1000px) {
  #article-admin {
    .des,
    .comment-num,
    .update-time,
    .create-time,
    .actions {
      display: none;
    }

    .actions {
      width: 50px;
    }
  }
}
</style>
