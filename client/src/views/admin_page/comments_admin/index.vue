
<template>
  <div id="comments">
    <n-table :single-line="false" size="small" striped>
      <thead>
        <tr>
          <th class="center">发布者昵称</th>
          <th>评论内容</th>
          <th>来自文章</th>
          <th class="email center">发布者邮箱</th>
          <th class="ip center">IP</th>
          <th class="address center">地址</th>
          <th class="create_time center">时间</th>
          <th class="center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in comments" :key="item.id">
          <td class="nickname center">{{ item.author }}</td>
          <td class="content">
            <n-ellipsis style="max-width: 300px">
              {{ item.content }}
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit molestias culpa expedita omnis nemo.
              Distinctio culpa ut iste velit cupiditate. Aperiam suscipit ad rem ex excepturi fugit saepe unde quos
            </n-ellipsis>
          </td>
          <td class="for-article">
            <n-ellipsis style="max-width: 200px">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit molestias culpa expedita omnis nemo.
              Distinctio culpa ut iste velit cupiditate. Aperiam suscipit ad rem ex excepturi fugit saepe unde quos
            </n-ellipsis>
          </td>
          <td class="email center">{{ item.email }}</td>
          <td class="ip center">{{ item.ip }}</td>
          <td class="address center">{{ item.address }}</td>
          <td class="create_time center">{{ item.date }}</td>
          <td class="actions center">
            <n-space justify="center">
              <n-button type="warning" text>封禁</n-button>
              <n-button type="error" text>删除</n-button>
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

const comments = ref([
  { id: 1, author: '张三', email: '24130801@qq.com', content: '', ip: '192.168.0.1', address: '四川省成都市青羊区', date: '2021-10-01 23:00:00' },
  { id: 2, author: '李四', email: '24130801@qq.com', content: '', ip: '192.168.0.1', address: '四川省成都市青羊区', date: '2021-10-02 23:00:00' },
  { id: 3, author: '王五', email: '24130801@qq.com', content: '', ip: '192.168.0.1', address: '四川省成都市青羊区', date: '2021-10-03 23:00:00' }
])

</script>


<style lang='scss' scoped>
#comments {
  padding: 24px;
  min-width: 800px;
  .center {
    text-align: center;
  }
  .content{
    width: 300px;
  }
  .nickname {
    width: 100px;
  }

  .for-article {
    width: 200px;
  }

  .email,
  .ip,
  .address,
  .create_time {
    width: 150px;
  }

  .actions {
    width: 100px;
  }
}

//  宽度低于 1380px并且大于 800px 时
@media screen and (max-width: 1380px) {
  #comments {
    .create_time{
      display: none;
    }
  }
}
// 宽度低于1168px时
@media screen and (max-width: 1168px) {
  #comments {
    .email,
    .ip,
    .address {
      display: none;
    }
  }
}
</style>