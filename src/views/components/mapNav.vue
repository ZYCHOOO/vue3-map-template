<template>
  <div class="map-nav-wrapper">
    <!-- 左部分(时间) -->
    <div class="map-nav-wrapper--left">
      <slot name="left" />
    </div>
    <!-- 标题部分 -->
    <div class="map-nav-wrapper--title">
      <svg-icon v-if="icon" :icon="icon" />
      <span v-if="title" v-html="title" />
    </div>
    <!-- 右部分(用户名、下拉菜单) -->
    <div class="map-nav-wrapper--right">
      <slot name="right" />
    </div>
    <!-- 导航栏 -->
    <div class="map-nav-tab">
      <div class="map-nav-tab--left">
        <div
          v-for="tab in leftTabs"
          :key="tab.id"
          v-html="tab.label"
          :class="['map-nav-tab-item', 'touchable', route.path === tab.path ? 'active' : '']"
          @click="tabClick(tab.path!)"
        />
      </div>
      <div class="map-nav-tab--right">
        <div
          v-for="tab in rightTabs"
          :key="tab.id"
          v-html="tab.label"
          :class="['map-nav-tab-item', 'touchable', route.path === tab.path ? 'active' : '']"
          @click="tabClick(tab.path!)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { NavItem } from './type'
import { useRoute, useRouter } from 'vue-router'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'mapNav',
  props: {
    title: { type: String, default: 'vue3地图大屏模版' },
    icon: { type: String, default: '' },
    tabs: { type: Array as PropType<NavItem[]>, required: true }
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()

    console.log(route)
    const leftTabs = computed<NavItem[]>(() => {
      return props.tabs.filter((_item , i) => i < props.tabs.length / 2)
    })

    const rightTabs = computed<NavItem[]>(() => {
      return props.tabs.filter((_item, i) => i >= props.tabs.length / 2)
    })

    const tabClick = (path: string) => {
      router.push(path)
    }

    return {
      route,
      leftTabs,
      rightTabs,
      tabClick
    }
  }
})

</script>

<style lang="scss" scoped>
  .map-nav-wrapper {
    position: absolute;
    top: 0;
    width: 100%;
    height: 2.9375rem /* 47/16 */;
    background-image: url('@/assets/images/top-bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: #FFF;
    z-index: 12;
    &--left {
      position: absolute;
      top: .125rem /* 2/16 */;
      left: .625rem /* 10/16 */;
      font-family: Din Alternate;
    }
    &--right {
      position: absolute;
      right: .625rem /* 10/16 */;
    }
    &--title {
      @include flex-row;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      span {
        font-size: 1.875rem /* 30/16 */;
        color: $defaultTitleColor;
        font-family: 'ShiShangZhongHei';
      }
    }
  }
  .map-nav-tab {
    @include flex-row;
    justify-content: space-between;
    position: absolute;
    left: 59%;
    top: 20px;
    top: 1.25rem /* 20/16 */;
    width: 76%;
    transform: translateX(-62%);
    &--left {
      @include flex-row;
      justify-content: space-around;
      width: 30%;
    }
    &--right {
      @include flex-row;
      justify-content: space-around;
      width: 30%;
    }
    &-item {
      @include flex-center;
      width: 7.5rem /* 120/16 */;
      padding: .125rem 0;
      border-radius: .125rem /* 2/16 */;
      border: 1px solid #6CFEFF;
      background: rgba(7,21,44,0.35);
      box-shadow: 0px 0px 2px rgba(108,254,255,0.5);
      height: 2rem /* 32/16 */;
      font-weight: bold;
      &.active {
        background: linear-gradient(90deg, rgba(41,107,196,0) 0%, rgba(41,107,196,0.5) 23%, #4E9DFD 50%, rgba(41,107,196,0.5) 77%, rgba(41,107,196,0) 100%);
      }
    }
  }
</style>
