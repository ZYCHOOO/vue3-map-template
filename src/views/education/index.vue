<template>
  <border-box12 class="module--left">
    <map-tabs v-model="currentTab" :options="options" :duration="8000" autoplay />
  </border-box12>
  <border-box12 class="module--right">
    <education-right />
  </border-box12>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EducationRight from './educationRight.vue'
import { BorderBox12 } from '@kjgl77/datav-vue3'

const currentTab = ref('kinderGarden')
const options = ref([
  { value: 'kinderGarden', label: '幼儿园' },
  { value: 'primarySchool', label: '小学' },
  { value: 'middleSchool', label: '初中' },
  { value: 'highSchool', label: '高中' },
  { value: 'college', label: '大学' }
])

</script>

<style lang="scss" scoped>

</style>
