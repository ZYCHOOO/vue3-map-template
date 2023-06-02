<template>
  <div class="map-index">
    <map-nav :tabs="navTabs">
      <template #left>
        111
      </template>
      <template #right></template>
    </map-nav>
    <Map />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Map from './components/map.vue'
import MapNav from './components/mapNav.vue'
import { NAV_TABS } from '@/constant/enums'
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref(null)
const navTabs = ref(NAV_TABS)

onMounted(() => {})

onUnmounted(() => {})

</script>

<style lang="scss" scoped>
  .map-index {
    width: 100vw;
    height: 100vh;
  }
</style>
