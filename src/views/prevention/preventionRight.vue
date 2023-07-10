<template>
  <div class="prevention-right">
    <div class="risk-box">
      <div
        v-for="item in riskData"
        :key="item.name"
        class="risk-box-item">
        <span class="name">{{ item.name }}</span>
        <span v-count="{ count: item.count, unit: '个' }" class="ml-auto count" />
      </div>
    </div>

    <div class="cure-box">
      <div
        v-for="item in cureData"
        :item="item.name"
        class="cure-box-item">
        <span v-count="{ count: item.count, unit: '人' }" class="count" />
        <span class="name">{{ item.name }}</span>
      </div>
    </div>

    <span class="module-title">风险地区疾病占比</span>
    <div class="ratio-chart">
      <map-chart
        :chart-style="{ height: '12rem' }"
        :chart-option="ratioChartOption"
      />
    </div>
    
    <span class="module-title">近半年风险地区数量变化</span>
    <div class="trend-chart">
      <map-chart
        :chart-style="{ height: '12rem' }"
        :chart-option="trendChartOption"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, computed } from 'vue'
import {
  apiGetRiskCount,
  apiGetCureCount,
  apiGetInfectionRatio,
  apiGetInfectionTrend
} from '@/api/preventionApi'

interface TrendItem {
  time: string,
  lowRisk: number,
  mediumRisk: number,
  highRisk: number
}

const riskData = ref([
  { name: '低风险地区', count: 0 },
  { name: '中风险地区', count: 0 },
  { name: '高风险地区', count: 0 }
])

const cureData = ref([
  { name: '已入院', count: 0 },
  { name: '已出院', count: 0 }
])

const ratioData = ref([
  { name: '新冠', value: 0, key: 'corona' },
  { name: '诺如', value: 0, key: 'noro' },
  { name: '猴痘', value: 0, key: 'mpox' }
])
const trendData = ref([] as TrendItem[])

const getRiskData = async() => {
  const { data } = await apiGetRiskCount()
  riskData.value = data
}

const getCureData = async() => {
  const { data } = await apiGetCureCount()
  cureData.value = data
}

const getRatio = async() => {
  const { data } = await apiGetInfectionRatio()
  ratioData.value.forEach(item => {
    item.value = data[item.key]
  })
}

const getTrend = async() => {
  const { data } = await apiGetInfectionTrend()
  trendData.value = data
}

const ratioChartOption = computed(() => {
  const option = {
    tooltip: { show: true },
    legend: {
      orient: 'vertical',
      right: '0%',
      top: '34%',
      itemWidth: 10,
      itemHeight: 10,
      icon: 'circle',
      textStyle: {
        fontSize: 14,
        color: "#A0B2D3",
        padding: [0,2, 0, 2],
      }
    },
    series: [{
      width: 300,
      // left: -10,
      type: 'pie',
      radius: ["66%", "50%"],
      label: {
        fontSize: 8,
        color: '#A0B2D3',
      },
      color: ['#4F9EFD', '#00EA9C', '#7662D6', '#FF913F'],
      data: ratioData.value
    }]
  }
  return option
})

const trendChartOption = computed(() => {
  return {
    grid: {
      top: '8%'
    },
    tooltip: { show: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
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
    series: [
      {
        name: '低风险地区',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: { color: '#00E9EA' },
        itemStyle: { color: '#00E9EA' },
        data: trendData.value.map(item => item.lowRisk),
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(0, 233, 234, 0.7)'
            },
            {
              offset: 1,
              color: 'rgba(0, 233, 234, 0.2)'
            }
          ])
        }
      },
      {
        name: '中风险地区',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: { color: '#4F9EFD' },
        itemStyle: { color: '#4F9EFD' },
        data: trendData.value.map(item => item.mediumRisk),
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(79, 158, 253, 0.7)'
            },
            {
              offset: 1,
              color: 'rgba(79, 158, 253, 0.2)'
            }
          ])
        }
      },
      {
        name: '高风险地区',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: { color: '#FFDD77' },
        itemStyle: { color: '#FFDD77' },
        data: trendData.value.map(item => item.highRisk),
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255, 221, 119, 0.7)'
            },
            {
              offset: 1,
              color: 'rgba(255, 221, 119, 0.2)'
            }
          ])
        }
      }
    ]
  }
})

getRiskData()
getCureData()
getRatio()
getTrend()

</script>

<style lang="scss" scoped>
  .risk-box {
    @include flex-column;
    margin-top: .75rem /* 12/16 */;
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
  .cure-box {
    @include flex-row;
    margin-bottom: .75rem /* 12/16 */;
    &-item {
      @include flex-column;
      @include flex-center;
      height: 5rem /* 80/16 */;
      width: 50%;
      font-weight: bold;
      background: linear-gradient(90deg, rgba(0,234,156,0.3) 0%, rgba(0,234,156,0.04) 100%);
      color: $defaultTextColor;
      .count {
        font-size: 1.375rem /* 22/16 */;
        color: #00E9EA;
      }
    }
  }
</style>
