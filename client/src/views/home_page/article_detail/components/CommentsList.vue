<template>
  <div id="comments-list">
    <div class="title">评论列表</div>
    <n-scrollbar style="max-height: calc(100vh - 350px)">
      <div class="list">
        <div class="item" v-for="item in commentsList" :key="item.id">
          <n-card size="small" :title="item.nickname">
            <div class="content">{{ item.content }}</div>
            <div class="info">
              <span class="time">
                <n-time :time="item.create_time" format="yyyy-MM-dd hh:mm"></n-time>
              </span>
              <span class="reply" @click="toComment(item.nickname, item.id)">回复</span>
            </div>
            <div class="item-children" v-for="children in item.children" :key="children.id">
              <n-card size="small" :bordered="false" :title="children.nickname">
                <div class="content">{{ children.content }}</div>
                <div class="info">
                  <span class="time">
                    <n-time :time="children.create_time" format="yyyy-MM-dd hh:mm"></n-time>
                  </span>
                  <span class="reply" @click="toComment(children.nickname, item.id)">回复</span>
                </div>
              </n-card>
            </div>
          </n-card>
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getCommentListApi } from "@/apis/comment";
import { useRoute } from "vue-router";
const route = useRoute();
const articleId = ref(route.query.id as string);

// 获取评论列表
const commentsList = ref<any>([]);
const getCommentList = async () => {
  const res = await getCommentListApi(articleId.value);
  if (res.code === 200) {
    commentsList.value = res.data;
  }
};
getCommentList();
const emits = defineEmits(["toComment"]);
const toComment = (nickname: string, id: number) => {
  // 传值给父组件
  const data = { nickname, id };
  emits("toComment", data);
};

defineExpose({
  getCommentList,
});
</script>

<style lang="scss" scoped>
#comments-list {
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .list {
    .item {
      margin-bottom: 20px;
      .info {
        display: flex;
        align-items: center;
        .time {
          font-size: 12px;
          color: #999;
        }
        .reply {
          color: #999;
          cursor: pointer;
          margin-left: 10px;
          transition: all 0.3s;
          &:hover {
            color: #409eff;
          }
        }
      }
    }
  }
}
</style>
