<template>
  <div class="medic-right">
    <span class="module-title">近七日就诊人数变化</span>
    <div class="patients-chart">
      <map-chart
        :chart-style="{ height: '16rem'}"
        :chart-option="chartOption"
      />
    </div>

    <span class="module-title">医院排行</span>
    <rank-column :rank-data="hospitalsData" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { apiGetTrend, apiGetHospitals } from '@/api/medicApi'

interface TrendItem {
  time: string,
  name: string,
  count: number
}

interface HospitalItem {
  id: number,
  name: string,
  longitude: number,
  latitude: number
}

const hospitalsData = ref([] as HospitalItem[])
const trendData = ref([] as TrendItem[])

const chartOption = computed(() => {
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
      type: 'bar',
      data: trendData.value.map(item => item.count),
      itemStyle: { color: '#6CFEFF' },
      barWidth: 30
    }]
  }
})

const getTrend = async() => {
  const { data } = await apiGetTrend()
  trendData.value = data
}

const getHospitals = async() => {
  const { data } = await apiGetHospitals()
  hospitalsData.value = data
}

getTrend()
getHospitals()

</script>

<style lang="scss" scoped>

</style>
