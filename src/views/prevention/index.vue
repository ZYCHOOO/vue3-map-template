<template>
  <border-box12 class="module--left">
    <map-tabs v-model="currentTab" :options="options" :duration="8000" autoplay />
    <corona v-if="currentTab === 'corona'" />
    <mpox v-if="currentTab === 'mpox'" />
    <noro v-if="currentTab === 'noro'" />
  </border-box12>
  <border-box12 class="module--right">
    <prevention-right />
  </border-box12>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Corona from './corona.vue'
import Mpox from './mpox.vue'
import Noro from './noro.vue'
import PreventionRight from './preventionRight.vue'
import { BorderBox12 } from '@kjgl77/datav-vue3'

const currentTab = ref('corona')
const options = ref([
  { value: 'corona', label: '新冠' },
  { value: 'noro', label: '诺如' },
  { value: 'mpox', label: '猴痘' }
])

</script>

<style lang="scss" scoped>
.map-tabs {
  margin-bottom: .75rem /* 12/16 */;
}
</style>
