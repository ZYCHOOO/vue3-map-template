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
    <div class="hospital-list">
      <div
        v-for="item in hospitalsData"
        :key="item.id"
        class="hospital-list-item touchable"
      >
        {{ item.name }}
      </div>
    </div>
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
  .hospital-list {
    @include flex-column;
    margin-top: .75rem /* 12/16 */;
    max-height: 22.5rem /* 360/16 */;
    overflow: scroll;
    &-item {
      @include flex-align-center;
      margin-bottom: .75rem /* 12/16 */;
      padding: .75rem /* 12/16 */ .75rem /* 12/16 */;
      background: rgba(79,158,253,0.1);
      &:hover {
        background: rgba(76,111,165,0.8);
      }
      &::before {
        content: '';
        margin-right: .375rem /* 6/16 */;
        width: .5rem /* 8/16 */;
        height: .5rem /* 8/16 */;
        background: #00E9EA;
        border-radius: 50%;
      }
    }
  }
</style>
