<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="theme">
    <n-card :content-style="{ padding: 0 }" :bordered="false">
      <router-view />
    </n-card>
    <div class="switch">
      <n-switch v-model:value="active" size="large" @update:value="handleChange">
        <template #checked-icon>
          <n-icon :component="ModeNightFilled" />
        </template>
        <template #unchecked-icon>
          <n-icon :component="LightModeFilled" />
        </template>
      </n-switch>
    </div>
  </n-config-provider>
</template>
<script setup lang="ts">
import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
import {
  LightModeFilled,
  ModeNightFilled
} from '@vicons/material'

import { ref } from 'vue'
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface';
const active = ref(false)
const theme = ref(null as BuiltInGlobalTheme | null)
// 切换主题
const handleChange = () => {
  if (active.value) {
    theme.value = darkTheme
  } else {
    theme.value = null
  }
}
</script>

<style lang="scss" scoped>
::v-deep(.n-card) {
  border-radius: 0;
}
.switch{
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>
