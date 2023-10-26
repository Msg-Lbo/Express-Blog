<template>
  <div id="addFriendModel">
    <n-modal v-model:show="showModal">
      <n-card style="width: 700px" title="友链申请" :bordered="false" size="small" role="dialog" aria-modal="true">
        <n-form ref="formRef" :model="friendForm" :rules="rules">
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="8" label="名字" path="name">
              <n-input v-model:value="friendForm.name" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="链接" path="link">
              <n-input v-model:value="friendForm.link" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="logo直链" path="logo">
              <n-input v-model:value="friendForm.logo" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="描述" path="description">
              <n-input v-model:value="friendForm.description" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="邮箱" path="email">
              <n-input v-model:value="friendForm.email" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="7" label="验证码" path="code">
              <n-input v-model:value="friendForm.code" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="5">
              <n-button style="width: 100%" @click="getCaptcha" :disabled="isGet">
                {{ isGet ? time + "s后再次获取" : "获取验证码" }}
              </n-button>
            </n-form-item-gi>
          </n-grid>
        </n-form>
        <div class="tips">
          {{ tips }}
        </div>
        <n-button @click="submitFriendForm">提交</n-button>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { addFriendApi } from "@/apis/friend";
import { getEmailCodeApi } from "@/apis/user";
import { FormRules, useMessage } from "naive-ui";
import { ref } from "vue";
const message = useMessage();
const showModal = ref(false);
const isGet = ref(false);
const time = ref(60);
const tips = ref("链接请务必带上http/https");
interface ModelType {
  name: string;
  link: string;
  logo: string;
  description: string;
  email: string;
  code: string;
}
const friendForm = ref<ModelType>({
  name: "",
  link: "",
  logo: "",
  description: "",
  email: "",
  code: "",
});

const rules: FormRules = {
  name: [
    { required: true, message: "请输入名字", trigger: ["blur", "input"] },
    { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: ["blur", "input"] },
  ],
  link: [{ required: true, message: "请输入链接", trigger: ["blur", "input"] }],
  logo: [{ required: true, message: "请输入logo直链", trigger: ["blur", "input"] }],
  description: [
    { required: true, message: "请输入介绍/描述", trigger: ["blur", "input"] },
    { min: 2, max: 100, message: "长度在 2 到 100 个字符", trigger: ["blur", "input"] },
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: ["blur", "input"] },
    { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change", "input"] },
  ],
  code: [{ required: true, message: "请输入验证码", trigger: ["blur", "input"] }],
};

// 获取验证码
const getCaptcha = async () => {
  if (!friendForm.value.email) {
    message.error("请输入邮箱");
    return;
  }
  // 60s倒计时
  isGet.value = true;
  const timer = setInterval(() => {
    time.value--;
    if (time.value === 0) {
      clearInterval(timer);
      isGet.value = false;
      time.value = 60;
    }
  }, 1000);
  const res = await getEmailCodeApi(friendForm.value.email);
  if (res.code === 200) {
    message.success(res.msg);
  }
};

// 表单验证并提交
const formRef = ref();
const submitFriendForm = () => {
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      const res = await addFriendApi(friendForm.value);
      if (res.code === 200) {
        message.success(res.msg);
      }
    } else {
      message.error("表单验证失败");
    }
  });
};

const showModalFn = () => {
  showModal.value = true;
};
defineExpose({
  showModalFn,
});
</script>

<style lang="scss" scoped>
.tips {
  color: #ff4d4f;
  margin-top: 10px;
}
</style>
