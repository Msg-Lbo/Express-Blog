<template>
  <div id="comments">
    <n-drawer v-model:show="state.active" :width="400" :placement="'left'" :show-mask="false">
      <n-drawer-content title="抽屉一样的评论区">
        <div class="header-content">
          <div class="user-info">
            <div class="info">
              <n-input placeholder="昵称" v-model:value="commentForm.nickname" />
              <n-input placeholder="邮箱" v-model:value="commentForm.email" />
            </div>
            <div class="captcha">
              <n-input placeholder="验证码" v-model:value="commentForm.code" autosize style="min-width: 50%" />
              <div class="captcha-svg" v-html:value="captcha" @click="getCaptcha"></div>
            </div>
            <div class="textarea">
              <n-input
                v-model:value="commentForm.content"
                placeholder="评论..."
                type="textarea"
                size="small"
                :autosize="{
                  minRows: 3,
                  maxRows: 3,
                }"
              />
            </div>
          </div>
          <div class="buttons">
            <n-space>
              <n-button v-if="commentForm.parent_id !== 0 && commentForm.content !== ''" @click="cancelReply"
                >取消回复</n-button
              >
              <n-button @click="sendComment">biu~</n-button>
            </n-space>
          </div>
        </div>
        <div class="comments-list">
          <comments-list ref="commentsListRef" @toComment="toComment" :articleId="parseInt(commentForm.article_id)" />
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import commentsList from "./CommentsList.vue";
import { getCaptchaApi } from "@/apis/captcha";
import { sendCommentApi } from "@/apis/comment";
import { useMessage } from "naive-ui";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const message = useMessage();
const captcha = ref();
const commentForm = ref({
  article_id: route.query.id as string,
  create_time: Date.now(),
  parent_id: 0,
  nickname: "",
  email: "",
  content: "",
  code: "",
});
// 是否是回复
const isReply = ref(commentForm.value.parent_id !== 0 ? true : false);
// 显示评论区
const state = ref({
  active: false,
});
// 显示评论区
const show = () => {
  state.value.active = true;
};
// 刷新验证码
const getCaptcha = async () => {
  const res = await getCaptchaApi();
  if (res.code === 200) {
    captcha.value = res.data;
  }
};
const commentsListRef = ref();
// 发送评论
const sendComment = async () => {
  if (
    !commentForm.value.nickname ||
    !commentForm.value.email ||
    !commentForm.value.content ||
    !commentForm.value.code
  ) {
    message.error("不能为空");
    return;
  }
  const res = await sendCommentApi(commentForm.value);
  if (res.code === 200) {
    message.success(res.msg);
    // 清空表单
    commentForm.value.content = "";
    // 执行子组件中的方法
    commentsListRef.value.getCommentList();
    getCaptcha();
  }
  getCaptcha();
};
// 取消回复
const cancelReply = () => {
  commentForm.value.parent_id = 0;
  commentForm.value.content = "";
  isReply.value = false;
};

// 获取子组件传递的值
const toComment = (data: { nickname: string; id: number }) => {
  commentForm.value.content = `回复 @${data.nickname}:`;
  commentForm.value.parent_id = data.id;
};

onMounted(() => {
  getCaptcha();
});
defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
.header-content {
  .user-info {
    .info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px;
      align-items: center;
      margin-bottom: 5px;
    }
    .captcha {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px;
      align-items: center;
      .captcha-svg {
        width: 70px;
        height: 34px;
        border-radius: 3px;
        background-color: #fff;
      }
    }

    .textarea {
      margin: 5px 0;
    }
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
