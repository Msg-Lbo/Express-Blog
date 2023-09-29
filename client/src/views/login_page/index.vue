<template>
    <div id="login">
        <div class="form-container">
            <n-card size="small">
                <n-h1>
                    后台登陆
                </n-h1>
                <n-form>
                    <n-form-item-row label="用户名">
                        <n-input v-model:value="username" />
                    </n-form-item-row>
                    <n-form-item-row label="密码">
                        <n-input v-model:value="password" />
                    </n-form-item-row>
                </n-form>
                <n-button :loading="loading" type="primary" block secondary strong @click="login">
                    登录
                </n-button>
            </n-card>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { debounce } from '@/utils/debounce'
const username = ref('');
const password = ref('');
const loading = ref(false);
// 登陆
const login = () => {
    loading.value = true;
    console.log(username.value, password.value);
    // 防抖
    const d_login = debounce(() => {
        loading.value = false;
    }, 1500);
    d_login();
}
</script>
  
<style lang="scss" scoped>
#login {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-container {
    width: 400px;
    padding: 40px;
    border-radius: 10px;

    ::v-deep(.n-h1) {
        text-align: center;
        font-weight: bold;
        letter-spacing: 8px;
    }
}
</style>