<template>
  <div id="dashboard">
    <div class="first-container box">
      <div class="numbers-content">
        <n-card size="small" hoverable>
          <div class="article-number num-content">
            <n-statistic label="文章" tabular-nums>
              <n-number-animation :from="0" :to="12039" />
            </n-statistic>
          </div>
        </n-card>
        <n-card size="small" hoverable>
          <div class="category-number num-content">
            <n-statistic label="分类" tabular-nums>
              <n-number-animation :from="0" :to="12039" />
            </n-statistic>
          </div>
        </n-card>

        <n-card size="small" hoverable>
          <div class="comment-number num-content">
            <n-statistic label="评论" tabular-nums>
              <n-number-animation :from="0" :to="12039" />
            </n-statistic>
          </div>
        </n-card>

        <n-card size="small" hoverable>
          <div class="link-number num-content">
            <n-statistic label="友链" tabular-nums>
              <n-number-animation :from="0" :to="12039" />
            </n-statistic>
          </div>
        </n-card>
      </div>
    </div>
    <!-- 第二 -->
    <div class="second-container box"></div>
    <!-- 第三 -->
    <div class="third-container box"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
#dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 8px;
  padding: 24px;
  .first-container {
    grid-column: 1 / span 2;
    .numbers-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 8px;

      ::v-deep .n-card {
        border-radius: 8px;
      }
      .num-content {
        text-align: center;
        height: 250px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        ::v-deep(.n-statistic) {
          // font-size: 24px;
          .n-statistic-value__content {
            font-size: 48px;
            font-weight: 600;
          }
        }
      }
    }
  }
  .box {
    // 铺满
    width: 100%;
  }
}
</style>
