<template>
  <n-form>
    <n-form-item-row label="用户名">
      <n-input v-model:value="loginForm.account" />
    </n-form-item-row>
    <n-form-item-row label="密码">
      <n-input v-model:value="loginForm.password" type="password" />
    </n-form-item-row>
  </n-form>
  <n-button type="primary" :loading="loading" block secondary strong @click="handleLogin">
    登录
  </n-button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { debounce } from "@/utils/debounce";
import { loginApi } from "@/apis/user";
import { useMessage } from "naive-ui";
import { useUserStore } from "@/store/userSotre";
import router from "@/router";
const userStore = useUserStore();
const loginForm = ref({
  account: "msglbo",
  password: "141444",
});
const message = useMessage();
const loading = ref(false);
// 登陆
const handleLogin = async () => {
  loading.value = true;
  // 防抖
  const d_login = debounce(async () => {
    loading.value = false;
  }, 1500);
  d_login();
  const res = await loginApi(loginForm.value);
  if (res.code === 200) {
    message.success(res.msg);
    router.push("/admin/dashboard");
    console.log(res);
    userStore.setUserInfo(res.data);
  }
};
</script>

<style lang="scss" scoped></style>
