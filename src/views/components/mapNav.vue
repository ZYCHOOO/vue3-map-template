<template>
  <div class="map-nav-wrapper">
    <!-- 左部分(时间) -->
    <div class="map-nav-wrapper--left"></div>
    <!-- 标题部分 -->
    <div class="map-nav-wrapper--title"></div>
    <!-- 右部分(用户名、下拉菜单) -->
    <div class="map-nav-wrapper--right"></div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'mapNav',
  props: {
    title: { type: String, default: 'vue3地图大屏模版' },
    icon: { type: String, default: '' }
  },
  setup(props, ctx) {}
})

</script>

<style lang="scss" scoped>

</style>
