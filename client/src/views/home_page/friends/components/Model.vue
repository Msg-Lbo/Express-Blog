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
            <n-form-item-gi :span="7" label="验证码" path="captcha">
              <n-input v-model:value="friendForm.captcha" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="5">
              <n-button style="width: 100%">获取验证码</n-button>
            </n-form-item-gi>
          </n-grid>
        </n-form>
        <n-button @click="submitFriendForm">提交</n-button>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { FormRules } from "naive-ui";
import { ref } from "vue";

const showModal = ref(true);
interface ModelType {
  name: string | null;
  link: string | null;
  logo: string | null;
  description: string | null;
  email: string | null;
  captcha: string | null;
}
const friendForm = ref<ModelType>({
  name: null,
  link: null,
  logo: null,
  description: null,
  email: null,
  captcha: null,
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
  captcha: [{ required: true, message: "请输入验证码", trigger: ["blur", "input"] }],
};

const formRef = ref();
const submitFriendForm = () => {
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      console.log("验证通过");
    } else {
      console.log(errors);
    }
  });
};
</script>

<style lang="scss" scoped></style>
