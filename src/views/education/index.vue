<template>
  <border-box12 class="module--left">
    <map-tabs v-model="currentTab" :options="options" :duration="8000" autoplay />
    <div class="education-config">
      <div
        v-for="item in configData"
        :key="item.key"
        class="education-config-item">
        <span class="desc">{{ item.name }}</span>
        <span v-count="{ count: item.count }" class="count ml-auto" />
      </div>
    </div>
    <div class="span-module">{{ currentName }}排行</div>
    <rank-column :rank-data="rankData" max-height="16.2rem" />
  </border-box12>
  <border-box12 class="module--right">
    <education-right />
  </border-box12>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import EducationRight from './educationRight.vue'
import { BorderBox12 } from '@kjgl77/datav-vue3'
import { apiGetEducationConfig, apiGetEducationRank } from '@/api/educationApi'

interface RankItem {
  id: number,
  name: string,
  longitude: number,
  latitude: number
}

const currentTab = ref('kinderGarden')
const options = ref([
  { value: 'kinderGarden', label: '幼儿园' },
  { value: 'primarySchool', label: '小学' },
  { value: 'middleSchool', label: '初中' },
  { value: 'highSchool', label: '高中' },
  { value: 'college', label: '大学' }
])

const configData = ref([
  { name: '骨干教师数量', key: 'keyTeacher', count: 0 },
  { name: '体育/艺术教师数量', key: 'peTeacher', count: 0 },
  { name: '教学面积', key: 'area', count: 0 },
  { name: '教学仪器数量', key: 'instrument', count: 0 }
])
const rankData = ref([] as RankItem[])

const currentName = computed(() => {
  const currentItem = options.value.find(item => item.value === currentTab.value)
  return currentItem && currentItem.label
})

const getConfigData = async(type: string) => {
  const { data } = await apiGetEducationConfig(type)
  configData.value.forEach(item => {
    item.count = data[item.key]
  })
}

const getRankData = async(type: string) => {
  const { data } = await apiGetEducationRank(type)
  rankData.value = data
}

watch(
  () => currentTab.value,
  (val) => {
    getConfigData(val)
    getRankData(val)
  }
)

getConfigData(currentTab.value)
getRankData(currentTab.value)

</script>

<style lang="scss" scoped>
.map-tabs {
  margin-bottom: .75rem /* 12/16 */;
}
.education-config {
  @include flex-column;
  &-item {
    @include flex-row;
    @include flex-align-center;
    margin-bottom: 1rem /* 16/16 */;
    padding: 0 1.25rem /* 20/16 */;
    height: 3.5rem /* 56/16 */;
    background-image: url(@/assets/images/item-bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-weight: bold;
    color: $defaultTextColor;
    .count {
      font-size: 1.375rem /* 22/16 */;
      color: #4F9EFD;
    }
  }
}
</style>
