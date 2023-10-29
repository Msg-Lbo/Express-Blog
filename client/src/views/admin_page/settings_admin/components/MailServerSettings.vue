<template>
  <div class="mail-server">
    <n-form ref="formRef" :model="model" :rules="rules" label-placement="top">
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="12" label="邮件服务" path="host">
          <n-input v-model:value="model.host" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="端口" path="port">
          <n-input-number v-model:value="model.port" style="width: 100%" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="邮箱" path="user">
          <n-input v-model:value="model.user" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="密码/Key" path="pass">
          <n-input type="password" v-model:value="model.pass" placeholder="离开或刷新页面后如需保存请重新输入" />
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <div class="save-button">
      <n-button size="medium" secondary type="success" @click="saveSettinds">保存</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { saveMailSettingsApi } from "@/apis/settings";
import { useSettingsStore } from "@/store/settings";
import { useMessage } from "naive-ui";
import { ref } from "vue";
const settingStore = useSettingsStore();
const message = useMessage();
const { host, port, user } = settingStore.$state.mailSettings;
const model = ref({
  host: host || "",
  port: port || 0,
  user: user || "",
  pass: "",
});

const rules = {
  host: [
    { required: true, message: "请输入邮件服务地址", trigger: "blur" },
    { type: "string", message: "请输入正确的邮箱地址", trigger: "blur" },
  ],
  port: [
    { required: true, message: "请输入端口", trigger: "blur" },
    { type: "string", message: "请输入正确的密码", trigger: "blur" },
  ],
  user: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
  ],
  pass: [
    { required: true, message: "请输入密码/Key", trigger: "blur" },
    { type: "string", message: "请输入正确的密码/Key", trigger: "blur" },
  ],
};
const formRef = ref();
const saveSettinds = async () => {
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      const res = await saveMailSettingsApi(model.value);
      if (res.code === 200) {
        message.success("保存成功");
      } else {
        message.error("保存失败");
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.save-button {
  text-align: right;
  margin-top: 20px;
}
</style>
