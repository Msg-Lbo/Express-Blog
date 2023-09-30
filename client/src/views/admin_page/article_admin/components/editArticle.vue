<template>
    <div id="edit-article">
        <div class="edit-article-header">
            <n-form :model="articleFrom" :rules="rules">
                <div class="left">
                    <n-form-item path="title" label="标题">
                        <n-input v-model:value="articleFrom.title" />
                    </n-form-item>
                    <n-form-item path="description" label="描述">
                        <n-input v-model:value="articleFrom.description" />
                    </n-form-item>
                </div>
                <div class="right">
                    <n-form-item path="create_time" label="发布时间">
                        <n-date-picker style="width: 100%;" v-model:value="articleFrom.create_time" type="datetime"
                            clearable />
                    </n-form-item>
                    <n-form-item path="update_time" label="最后更新时间">
                        <n-date-picker style="width: 100%;" v-model:value="articleFrom.update_time" type="datetime"
                            clearable />
                    </n-form-item>
                </div>
            </n-form>
        </div>
        <MdEditor v-model="articleFrom.content" :theme="theme" @on-save="saveArticle" />
    </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { useThemeStore } from '@/store/theme'
import { FormRules } from 'naive-ui';

const articleFrom = ref({
    title: '',
    description: '',
    content: '',
    create_time: 0,
    update_time: Date.now(),
})
function validateTime(): boolean {
    return articleFrom.value.create_time <= articleFrom.value.update_time
}
const rules: FormRules = {
    title: [
        {
            required: true,
            message: '标题不能为空',
            trigger: 'blur',
        }
    ],
    description: [
        {
            required: true,
            message: '描述不能为空',
            trigger: 'blur',
        }
    ],
    content: [
        {
            required: true,
            message: '内容不能为空',
            trigger: 'blur',
        }
    ],
    create_time: [
        {
            type: 'number',
            required: true,
            trigger: ['blur', 'change'],
            message: '请选择发布时间'
        }
    ],
    update_time: [
        {
            type: 'number',
            required: true,
            trigger: ['blur', 'change'],
            message: '请选择最后更新时间'
        },
        {
            validator: validateTime,
            message: '更新时间需要大于发布时间',
            trigger: ['blur', 'input'],
        }
    ],
}
const themeStore = useThemeStore()
const theme = ref<any>(themeStore.$state.theme)
watch(themeStore.$state, (_oldVal, newVal) => {
    theme.value = newVal.theme
})

// 保存文章
const saveArticle = () => {
    console.log(articleFrom.value)
}
</script>

<style lang='scss' scoped>
#edit-article {
    .edit-article-header {
        ::v-deep(.n-form) {
            display: grid;
            // 宽度小于400px时，自动换行
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 8px,
        }
    }
}
</style>