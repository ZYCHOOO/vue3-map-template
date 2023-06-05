<template>
  <div class="map-index">
    <map-nav :tabs="navTabs">
      <template #left>
        {{ currentTime }}
      </template>
      <template #right></template>
    </map-nav>
    <Map />
    <map-type />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Map from './components/Map.vue'
import MapNav from './components/MapNav.vue'
import MapType from './components/MapType.vue'
import { NAV_TABS } from '@/constant/enums'
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance() as any

let timer:NodeJS.Timer | null = null
const currentTime = ref()
const navTabs = ref(NAV_TABS)

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = proxy.$filters.dateTimeFilter(new Date().getTime(), 'YYYY年MM月DD HH:mm:ss')
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
