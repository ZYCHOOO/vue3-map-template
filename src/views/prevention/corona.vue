<template>
  <div class="corona">
    <div
      v-for="item in statistics"
      :key="item.year"
      class="corona-item">
      {{ item.year }}感染者
      <span v-count:[item.count]="{ unit: '例' }" class="ml-auto" />
    </div>

    <div class="corona-box">
      <div
        v-for="item in coronaData"
        :key="item.name"
        class="corona-box-item">
        <span v-count:[item.count]="{ unit: '例' }" class="count" />
        <span v-html="item.name" class="title" />
      </div>
    </div>

    <span class="module-title">近半年新冠感染者变化</span>
    <div class="corona-chart">
      <map-chart
        :chart-style="{ height: '13rem' }"
        :chart-option="ratioChartOption"
      />
      <map-chart
        :chart-style="{ height: '13rem'}"
        :chart-option="trendChartOption"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { apiGetCoronaCount, apiGetCoronaTrend, apiGetCoronaRatio } from '@/api/preventionApi'

interface TrendItem {
  time: string,
  name: string,
  count: number
}

const statistics = ref([
  { year: 2022, count: 0 },
  { year: 2023, count: 0 }
])

const ratioData = ref([
  { name: '一阳患者', value: 0, key: 'first' },
  { name: '二阳患者', value: 0, key: 'second' },
  { name: '三阳及以上患者', value: 0, key: 'multiple' }
])

const coronaData = ref([
  { name: '全国感染者', count: 0 },
  { name: '新增感染者', count: 0 }
])

const trendData = ref([] as TrendItem[])

const getCoronaStatistics = async() => {
  const { data } = await apiGetCoronaCount()
  const { year, total } = data
  statistics.value = year
  coronaData.value = total
}

const getCoronaRatio = async() => {
  const { data } = await apiGetCoronaRatio()
  ratioData.value.forEach(item => {
    item.value = data[item.key]
  })
}

const getCoronaTrend = async() => {
  const { data } = await apiGetCoronaTrend()
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
    tooltip: { show: true },
    grid: { top: 10 },
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

getCoronaStatistics()
getCoronaTrend()
getCoronaRatio()

</script>

<style lang="scss" scoped>
  .corona {
    @include flex-column;
    &-item {
      @include flex-align-center;
      margin-bottom: .75rem /* 12/16 */;
      padding: 0 1.25rem /* 20/16 */;
      height: 3rem /* 48/16 */;
      background: linear-gradient(135deg, rgba(79,158,253,0.28) 0%, rgba(79,158,253,0.04) 100%);
      color: $defaultTextColor;
      span {
        font-size: 1.875rem /* 30/16 */;
        font-family: Din Alternate;
        color: #4F9EFD;
      }
    }
    &-box {
      @include flex-row;
      margin-bottom: .75rem /* 12/16 */;
      &-item {
        width: 50%;
        @include flex-column;
        @include flex-center;
        height: 7.5rem /* 120/16 */;
        background: linear-gradient(90deg, rgba(255,145,63,0.3) 0%, rgba(255,145,63,0.04) 100%);
        .title {
          color: $defaultTextColor;
        }
        .count {
          font-size: 1.875rem /* 30/16 */;
          font-family: Din Alternate;
          color: #FF913F;
        }
      }
    }
  }
</style>
