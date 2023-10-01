<template>
    <div>
        <n-form ref="formRef" :model="model" label-placement="top">
            <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="12" label="站点标题" path="siteTtile">
                    <n-input v-model:value="model.inputValue" placeholder="Input" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="站点ico" path="siteIco">
                    <n-input v-model:value="model.inputValue" placeholder="Input" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="公安备案" path="gongan">
                    <n-input v-model:value="model.inputValue" placeholder="Input" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="ICP备案" path="icp">
                    <n-input v-model:value="model.inputValue" placeholder="Input" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="主页左侧背景(light)" path="icp">
                    <n-input v-model:value="model.inputValue" placeholder="Input" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="主页左侧背景(dark)" path="icp">
                    <n-input v-model:value="model.inputValue" placeholder="Input" />
                </n-form-item-gi>
            </n-grid>
        </n-form>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
const model = ref({
    inputValue: '',
    textareaValue: '',
    selectValue: '',
    multipleSelectValue: [],
    datetimeValue: '',
    switchValue: false,
    checkboxGroupValue: []
})
</script>

<style lang='scss' scoped></style>