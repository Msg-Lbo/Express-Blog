<template>
  <div id="home">
    <n-grid cols="10" item-responsive>
      <n-grid-item span="768:10 1200:3 10">
        <div class="left">
          <sidebar />
        </div>
      </n-grid-item>
      <n-grid-item span="768:10 1200:7 10">
        <div class="right">
          <n-card :bordered="false">
            <router-view />
          </n-card>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import sidebar from "./components/Sidebar.vue";
</script>

<style lang="scss" scoped>
#home {
  height: 100vh;

  .left,
  .right {
    border-right: 1px solid #eaeaea;
  }
}
</style>
