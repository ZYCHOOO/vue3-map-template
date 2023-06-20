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
          class="map-nav-tab-item touchable"
          v-html="tab.label"
          @click="tabClick(tab.path!)"
        />
      </div>
      <div class="map-nav-tab--right">
        <div
          v-for="tab in rightTabs"
          :key="tab.id"
          class="map-nav-tab-item touchable"
          v-html="tab.label"
          @click="tabClick(tab.path!)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { NavItem } from './type'
import { useRouter } from 'vue-router'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'mapNav',
  props: {
    title: { type: String, default: 'vue3地图大屏模版' },
    icon: { type: String, default: '' },
    tabs: { type: Array as PropType<NavItem[]>, required: true }
  },
  setup(props) {
    const router = useRouter()
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
      left: .625rem /* 10/16 */;
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
      padding: .125rem .5rem /* 2/16 */ /* 8/16 */;
      border-radius: .5rem /* 8/16 */;
      border: 1px solid #6CFEFF;
      height: 2rem /* 32/16 */;
    }
  }
</style>
