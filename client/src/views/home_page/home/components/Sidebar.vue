<template>
  <div id="sidebar">
    <div class="logo">
      <img src="http://q1.qlogo.cn/g?b=qq&nk=24130801&s=100" alt="" />
      <div class="text-logo">
        <h1>一楼没太阳</h1>
        <p>买四个萝卜</p>
      </div>
    </div>
    <div class="menu">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" @update:value="handleMenuChange" />
    </div>
    <!-- 备案信息 -->
    <div class="icp">
      <n-button text tag="a" href="https://beian.miit.gov.cn/" target="_blank" type="primary">
        蜀ICP备2021111111号
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import type { MenuOption } from "naive-ui";
import { ref } from "vue";
const activeKey = ref<string | null>(null);
const menuOptions: MenuOption[] = [
  {
    label: "首页",
    key: "list",
  },
  {
    label: "分类",
    key: "categories",
  },
  {
    label: "时间轴",
    key: "archives",
  },
  {
    label: "友联",
    key: "friends",
  },
  {
    label: "关于",
    key: "about",
  },
];

// 菜单切换触发
const handleMenuChange = (key: string) => {
  activeKey.value = key;
  router.push({ name: key });
};
</script>

<style lang="scss" scoped>
#sidebar {
  height: 100vh;
  font-weight: bold;
  background-image: url("@/assets/images/sidebar-bg-light-2.png");
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  position: relative;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    border-radius: 50%;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 20px;
      cursor: pointer;
      transition: all 0.5s ease-in-out;

      &:hover {
        // 旋转
        transform: rotate(360deg);
      }
    }
  }

  .menu {
    margin: 0 auto;
    text-align: center;
  }

  .icp {
    width: 100%;
    min-height: 50px;
    background-color: #00000030;
    backdrop-filter: blur(10px);
    padding: 8px 0;
    position: absolute;
    bottom: 0;
    text-align: center;
    font-size: 12px;
  }
}

// 宽度小于 1200px 时
@media screen and (max-width: 1200px) {
  #sidebar {
    height: auto;
    background-position: top;
    .logo {
      img {
        width: 70px;
        height: 70px;
      }
    }
  }
}

// 宽度小于 768px 时，头像变小
@media screen and (max-width: 768px) {
  #sidebar {
    .logo {
      img {
        width: 50px;
        height: 50px;
      }
    }

    .icp {
      display: none;
    }
  }
}
</style>
