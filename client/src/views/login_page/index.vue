<template>
    <div id="login">
        <div class="form-container">
            <n-card size="small">
                <n-h1>
                    后台登陆
                </n-h1>
                <n-tabs class="card-tabs" default-value="signin" size="large" animated pane-wrapper-style="margin: 0 -4px"
                    pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
                    <n-tab-pane name="signin" tab="登录">
                        <login-view></login-view>
                    </n-tab-pane>
                    <n-tab-pane name="signup" tab="注册">
                        <register-view></register-view>
                    </n-tab-pane>
                </n-tabs>
            </n-card>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import loginView from './components/login.vue';
import registerView from './components/register.vue';
</script>
  
<style lang="scss" scoped>
#login {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-container {
    width: 600px;
    padding: 40px;
    border-radius: 10px;

    ::v-deep(.n-h1) {
        text-align: center;
        font-weight: bold;
        letter-spacing: 8px;
    }
}
</style>