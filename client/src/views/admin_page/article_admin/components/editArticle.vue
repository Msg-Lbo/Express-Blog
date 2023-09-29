<template>
    <div>
        <MdEditor v-model="text" :theme="theme" />
    </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('Hello Editor!');
import { useThemeStore } from '@/store/theme'
const themeStore = useThemeStore()
const theme = ref<any>('dark')
watch(themeStore.$state, (_oldVal, newVal) => {
    theme.value = newVal.theme
})

</script>

<style lang='scss' scoped></style>