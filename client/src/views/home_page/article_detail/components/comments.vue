<template>
  <div id="comments">
    <n-drawer v-model:show="state.active" :width="400" :placement="'left'" :show-mask="false">
      <n-drawer-content title="抽屉一样的评论区">
        <div class="header-content">
          <div class="textarea">
            <n-input
              v-model:value="commentForm.text"
              placeholder="自动调整尺寸"
              type="textarea"
              size="small"
              :autosize="{
                minRows: 3,
                maxRows: 3,
              }"
            />
          </div>
          <div class="buttons">
            <n-button>提交</n-button>
          </div>
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const commentForm = ref({
  email: "",
  text: "",
  code: "",
});
const state = ref({
  active: false,
});
const show = () => {
  state.value.active = true;
};
defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
.header-content {
  .textarea {
    margin-bottom: 10px;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
