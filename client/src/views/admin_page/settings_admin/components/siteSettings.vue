<template>
  <div>
    <n-form ref="formRef" :model="model" label-placement="top">
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="12" label="站点标题" path="siteTtile">
          <n-input v-model:value="model.Title" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="站点ico" path="siteIco">
          <n-input v-model:value="model.Ico" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="站点Logo" path="siteIco">
          <n-input v-model:value="model.Logo" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="标题一" path="siteIco">
          <n-input v-model:value="model.LogoText" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="标题二" path="siteIco">
          <n-input v-model:value="model.LogoText2" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="公安备案" path="gongan">
          <n-input v-model:value="model.GongAn" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="ICP备案" path="icp">
          <n-input v-model:value="model.Ipc" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="主页左侧背景(light)" path="icp">
          <n-input v-model:value="model.LeftBgLight" placeholder="Input" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="主页左侧背景(dark)" path="icp">
          <n-input v-model:value="model.LeftBgDark" placeholder="Input" />
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <div class="save-button">
      <n-button size="medium" secondary type="success" @click="saveSettinds">保存</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSettingsStore } from "@/store/settings";
import { saveSettingsApi } from "@/apis/settings";
import { useMessage } from "naive-ui";
const settingStore = useSettingsStore();
const message = useMessage()
const { Title, Ico, Logo, LogoText, LogoText2, GongAn, Ipc, LeftBgLight, LeftBgDark } = settingStore.$state;
const model = ref({
  Title: Title || "",
  Ico: Ico || "",
  Logo: Logo || "",
  LogoText: LogoText || "",
  LogoText2: LogoText2 || "",
  GongAn: GongAn || "",
  Ipc: Ipc || "",
  LeftBgLight: LeftBgLight || "",
  LeftBgDark: LeftBgDark || "",
});
const saveSettinds = async() => {
    const res = await saveSettingsApi(model.value)
    if (res.code===200) {
        message.success(res.msg)
        settingStore.getSettings()
    }
};
</script>

<style lang="scss" scoped>
.save-button{
    text-align: right;
    margin-top: 20px;
}
</style>
