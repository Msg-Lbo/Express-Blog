<template>
  <div id="edit-article">
    <div class="edit-article-header">
      <n-form :model="articleFrom" :rules="rules">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="12" path="title" label="标题">
            <n-input v-model:value="articleFrom.title" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" path="description" label="描述">
            <n-input v-model:value="articleFrom.description" />
          </n-form-item-gi>
          <n-form-item-gi :span="6" path="create_time" label="发布时间">
            <n-date-picker style="width: 100%" v-model:value="articleFrom.create_time" type="datetime" clearable />
          </n-form-item-gi>
          <n-form-item-gi :span="6" path="update_time" label="最后更新时间">
            <n-date-picker style="width: 100%" v-model:value="articleFrom.update_time" type="datetime" clearable />
          </n-form-item-gi>
          <n-form-item-gi :span="12" path="category_id" label="分类">
            <n-select v-model:value="articleFrom.category_id" placeholder="Select" :options="options" clearable />
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </div>
    <MdEditor v-model="articleFrom.content" :theme="theme" @on-save="saveArticle" @onUploadImg="onUploadImg" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { useThemeStore } from "@/store/theme";
import { FormRules, useMessage } from "naive-ui";
import { saveArticleApi } from "@/apis/article";
import { getAllCategoryApi } from "@/apis/category";
import { uploadImageApi } from "@/apis/image";
import { httpInstance } from "@/apis";
const message = useMessage();
document.title = "编辑文章";
interface ArticleFrom {
  id?: number | null;
  title: string;
  description: string;
  content: string;
  category_id: number;
  create_time: number;
  update_time: number;
}
// 父组件传递过来的文章信息
const props = defineProps({
  articleData: {
    type: Object,
    default: undefined,
  },
});
const articleFrom = ref<ArticleFrom>({
  id: null,
  title: "",
  description: "",
  content: "",
  category_id: 0,
  create_time: Date.now(),
  update_time: Date.now(),
});

if (props.articleData) {
  articleFrom.value.id = props.articleData.id;
  articleFrom.value.title = props.articleData.title;
  articleFrom.value.description = props.articleData.description;
  articleFrom.value.content = props.articleData.content;
  articleFrom.value.category_id = props.articleData.category_id;
  articleFrom.value.create_time = props.articleData.create_time;
  articleFrom.value.update_time = props.articleData.update_time;
}

articleFrom.value.description = articleFrom.value.content.slice(0, 100);
function validateTime(): boolean {
  return articleFrom.value.create_time <= articleFrom.value.update_time;
}
const rules: FormRules = {
  title: [
    {
      required: true,
      message: "标题不能为空",
      trigger: "blur",
    },
  ],
  description: [
    {
      required: true,
      message: "描述不能为空",
      trigger: "blur",
    },
  ],
  content: [
    {
      required: true,
      message: "内容不能为空",
      trigger: "blur",
    },
  ],
  category_id: [
    {
      required: true,
      message: "请选择分类",
      trigger: ["blur", "change"],
      type: "number",
    },
  ],
  create_time: [
    {
      type: "number",
      required: true,
      trigger: ["blur", "change"],
      message: "请选择发布时间",
    },
  ],
  update_time: [
    {
      type: "number",
      required: true,
      trigger: ["blur", "change"],
      message: "请选择最后更新时间",
    },
    {
      validator: validateTime,
      message: "更新时间需要大于发布时间",
      trigger: ["blur", "change"],
    },
  ],
};
const themeStore = useThemeStore();
const theme = ref<any>(themeStore.$state.theme);
watch(themeStore.$state, (_oldVal, newVal) => {
  theme.value = newVal.theme;
});
onMounted(() => {
  getCategory();
});
// 保存文章
const saveArticle = async () => {
  console.log(articleFrom.value);

  const res = await saveArticleApi(articleFrom.value);
  if (res.code === 200) {
    message.success(res.msg);
  }
};
// 获取分类
const options = ref<any>([
  {
    label: "默认分类",
    value: 0,
  },
]);
const getCategory = async () => {
  const res = await getAllCategoryApi();
  if (res.code === 200) {
    const list = res.data.map((item: any) => {
      return {
        label: item.category_name,
        value: item.id,
      };
    });
    options.value.push(...list);
  }
};

const onUploadImg = async (files: any[], callback: (arg0: any[]) => void) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise(async (rev, rej) => {
        const form = new FormData();
        form.append("file", file);
        await uploadImageApi(form)
          .then((res) => {
            rev(res);
          })
          .catch((err) => {
            rej(err);
          });
      });
    })
  );
  callback(res.map((item: any) => httpInstance.defaults.url + item.data[0]));
};
</script>

<style lang="scss" scoped></style>
