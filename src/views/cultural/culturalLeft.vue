<template>
  <div class="cultural-left">
    <map-tabs v-model="currentTab" :options="options" />

    <span class="module-title">{{ currentLabel }}参观者年龄分布</span>
    <div class="composition-chart">
      <map-chart
        :chart-style="{ height: '16rem'}"
        :chart-option="compositionOption"
      />
    </div>

    <span class="module-title">{{ currentLabel }}近七日接待人数变化</span>
    <div class="trend-chart">
      <map-chart
        :chart-style="{ height: '16rem'}"
        :chart-option="trendOption"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { apiGetCulturalComposition, apiGetCulturalTrend } from '@/api/culturalApi'

interface TrendItem {
  time: string,
  name: string,
  count: number
}

const currentTab = ref('library')
const trendData = ref([] as TrendItem[])
const options = ref([
  { value: 'library', label: '图书馆' },
  { value: 'cultural', label: '文化馆' },
  { value: 'museum', label: '博物馆' }
])
const compositionData = ref([
  { name: '18岁及以下', value: 0, key: 'children' },
  { name: '19岁-30岁', value: 0, key: 'teenager' },
  { name: '31岁-60岁', value: 0, key: 'middleaged' },
  { name: '61岁及以上', value: 0, key: 'old' }
])

const currentLabel = computed(() => {
  const option = options.value.find(item => item.value === currentTab.value)
  return option && option.label
})

const compositionOption = computed(() => {
  return {
    tooltip: { show: true },
    series: [{
      type: 'pie',
      label: {
        fontSize: 8,
        color: '#A0B2D3',
      },
      data: compositionData.value
    }]
  }
})

const trendOption = computed(() => {
  return {
    tooltip: { show: true },
    xAxis: {
      type: 'category',
      data: trendData.value.map(item => item.time)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        textStyle: {
          fontSize: 12,
          // color: 'rgba(59, 65, 79, .5)'
        }
      }
    },
    series: [{
      type: 'line',
      data: trendData.value.map(item => item.count),
      itemStyle: { color: '#6CFEFF' },
      barWidth: 30
    }]
  }
})

watch(
  () => currentTab.value,
  (val) => {
    getCompositionData(val)
    getTrendData(val)
  }
)

const getCompositionData = async(tab: string) => {
  const { data } = await apiGetCulturalComposition(tab)
  compositionData.value.forEach(item => {
    item.value = data[item.key]
  })
}

const getTrendData = async(tab: string) => {
  const { data } = await apiGetCulturalTrend(tab)
  trendData.value = data
}

getCompositionData(currentTab.value)
getTrendData(currentTab.value)

</script>

<style lang="scss" scoped>

.map-tabs {
  margin-bottom: .75rem /* 12/16 */;
}
</style>
