<template>
  <div id="categories">
    <n-scrollbar style="max-height: 860px">
      <ul class="card-list">
        <li class="card-item" v-for="(__, index) in 14" :key="index">
          <n-card size="small" hoverable>
            <div class="content">
              <div class="category-name">
                分类{{ index }}
              </div>
              <div class="info">
                {{ index + 20 }}
              </div>
            </div>
          </n-card>
        </li>
      </ul>
    </n-scrollbar>
  </div>
</template>

<script setup lang='ts'>
</script>

<style lang='scss' scoped>
.card-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;

  .card-item {
    cursor: pointer;

    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

// 小于768px时
@media screen and (max-width: 768px) {
  #categories {
    ::v-deep(.n-scrollbar) {
      max-height: 460px !important;
    }
  }
}
</style>