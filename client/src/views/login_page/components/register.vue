<template>
    <n-form ref="formRef" :model="registerForm" :rules="rules" label-placement="top">
        <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="12" label="账号" path="username">
                <n-input placeholder="Input" v-model:value="registerForm.username" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="邮箱" path="email">
                <n-auto-complete v-model:value="registerForm.email" :options="autoCompleteOptions" placeholder="Email" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="密码" path="password">
                <n-input placeholder="Input" v-model:value="registerForm.password" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="确认密码" path="reenteredPassword">
                <n-input placeholder="Input" v-model:value="registerForm.reenteredPassword" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="验证码" path="code">
                <n-input placeholder="Input" v-model:value="registerForm.code" />
            </n-form-item-gi>
            <n-form-item-gi :span="12">
                <n-button @click="getCode" :disabled="isGet">
                    {{ isGet ? time + 's后再次获取' : '获取验证码' }}
                </n-button>
            </n-form-item-gi>
        </n-grid>
    </n-form>
    <n-button type="primary" :loading="loading" block secondary strong @click="handleRegister">
        注册
    </n-button>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue';
import { getEmailCode, register } from '@/apis/user';
import { FormItemRule, FormRules, useMessage } from 'naive-ui';
import { debounce } from '@/utils/debounce';
const isGet = ref(false);
const time = ref(60);
const message = useMessage()
const loading = ref(false);

interface ModelType {
    username: string
    email: string
    password: string
    reenteredPassword: string
    code: string
}
// 表单数据
const registerForm = ref<ModelType>({
    username: '',
    email: '',
    password: '',
    reenteredPassword: '',
    code: ''
});
// 邮箱后缀
const emailSuffixes = ref(['@gmail.com', '@163.com', '@qq.com']);
// 验证密码是否以某个字符串开头
function validatePasswordStartWith(
    _rule: FormItemRule,
    value: string
): boolean {
    return (
        !!registerForm.value.password &&
        registerForm.value.password.startsWith(value) &&
        registerForm.value.password.length >= value.length
    )
}
// 验证两次密码是否一致
function validatePasswordSame(_rule: FormItemRule, value: string): boolean {
    return value === registerForm.value.password
}
// 表单验证规则
const rules: FormRules = {
    username: [
        { required: true, message: '请输入用户名' },
        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['input', 'blur'] }
    ],
    password: [
        { required: true, message: '请输入密码' },
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
        { validator: validatePasswordStartWith, message: '两次密码输入不一致', trigger: ['input', 'blur'] }
    ],
    reenteredPassword: [
        { required: true, message: '请输入确认密码' },
        { validator: validatePasswordSame, message: '两次输入密码不一致', trigger: 'input' }
    ],
    code: [
        { required: true, message: '请输入验证码' },
        { min: 6, max: 6, message: '长度为 6 个字符', trigger: ['blur', 'password-input'] }
    ]
}
// 邮箱后缀自动补全
const autoCompleteOptions = computed(() => {
   return emailSuffixes.value.map((suffix) => {
       const prefix = registerForm.value.email.split('@')[0];
       return {
           label: prefix + suffix,
           value: prefix + suffix
       }
   });
});
// 获取验证码
const getCode = async () => {
    if (!registerForm.value.email) {
        message.error('请输入邮箱');
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
    const res = await getEmailCode(registerForm.value.email);
    if (res.code === 200) {
        message.success(res.msg)
    }
}
// 注册
const handleRegister = async () => {
    loading.value = true;
    // 防抖
    const d_register = debounce(async () => {
        loading.value = false;
    }, 1500);
    d_register();
    const res = await register(registerForm.value);
    if (res.code === 200) {
        message.success(res.msg)
    }
}
</script>

<style lang='scss' scoped></style>