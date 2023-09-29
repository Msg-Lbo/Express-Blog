<template>
    <div id="home-admin">
        <n-layout style="height: 100vh">
            <n-layout-header style="height: 64px; padding: 24px" bordered>
                颐和园路
            </n-layout-header>
            <n-layout position="absolute" style="top: 64px; bottom: 64px" has-sider>
                <n-layout-sider content-style="padding: 24px;" :native-scrollbar="false" bordered>
                    <n-h2>海淀桥</n-h2>
                    <n-h2>海淀桥</n-h2>
                    <n-h2>海淀桥</n-h2>
                    <n-h2>海淀桥</n-h2>
                    <n-h2>海淀桥</n-h2>
                    <n-h2>海淀桥</n-h2>
                    <n-h2>海淀桥</n-h2>
                    <n-h2>海淀桥</n-h2>
                    <n-h2>海淀桥</n-h2>
                    <n-h2>海淀桥</n-h2>
                    <n-h2>海淀桥</n-h2>
                    <n-h2>海淀桥</n-h2>
                </n-layout-sider>
                <n-layout content-style="padding: 24px;" :native-scrollbar="false">
                    <router-view></router-view>
                </n-layout>
            </n-layout>
            <n-layout-footer position="absolute" style="height: 64px; padding: 24px" bordered>
                城府路
            </n-layout-footer>
        </n-layout>
    </div>
</template>

<script setup lang='ts'>
import { MenuOption, NIcon } from 'naive-ui';
import { Component, h } from 'vue';



function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  
  {
    key: 'divider-1',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px'
      }
    }
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(BookIcon),
    disabled: true
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon(PersonIcon)
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(WineIcon),
        children: [
          {
            label: '威士忌',
            key: 'whisky'
          }
        ]
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich'
          }
        ]
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]

</script>

<style lang='scss' scoped></style>