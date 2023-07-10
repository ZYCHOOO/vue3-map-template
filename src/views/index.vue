<template>
  <div class="map-index">
    <!-- 顶部导航栏 -->
    <map-nav :tabs="navTabs">
      <template #left>
        {{ currentTime }}
      </template>
      <template #right></template>
    </map-nav>
    <!-- 地图 -->
    <map-container />
    <!-- 地图图层切换 -->
    <map-type />
    <!-- 地图抽屉 -->
    <map-drawer />
    <!-- 地图弹窗 -->
    <MapDialog v-model="dialogVisible" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import MapNav from './components/MapNav.vue'
import MapType from './components/MapType.vue'
import MapDrawer from './components/MapDrawer.vue'
import MapContainer from './components/MapContainer.vue'
import { storeToRefs } from 'pinia'
import { NAV_TABS } from '@/constant/enums'
import { mapDialogStore } from '@/store/mapDialog'
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance() as any

let timer:NodeJS.Timer | null = null
const currentTime = ref()
const navTabs = ref(NAV_TABS)
const mapDialog = mapDialogStore()
const { dialogVisible } = storeToRefs(mapDialog)

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = proxy.$filters.dateTimeFilter(new Date().getTime(), 'YYYY年MM月DD日 HH:mm:ss')
  }, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(Number(timer))
  }
})

</script>

<style lang="scss" scoped>
  .map-index {
    width: 100vw;
    height: 100vh;
  }
</style>
