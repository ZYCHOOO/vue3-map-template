<template>
  <div class="education-right">
    <div class="general-box">
      <div
        v-for="item in generalData"
        :key="item.name"
        :class="['general-box-item', currentType === item.key ? 'active' : '']"
        @click="toggleType(item.key)">
        <img :src="iconSrc(item.key)" alt="">
        <span class="general-box-name">{{ item.name }}</span>
        <span v-count="{ count: item.count, unit: '间' }" class="general-box-count ml-auto" />
      </div>
    </div>

    <span class="module-title">{{ currentName }}人数统计</span>
    <div class="education-count">
      <span v-count="{ count: studentCount, unit: '人' }" class="count" />
      <span class="name">最新统计人数</span>
    </div>
    <div class="trend-chart">
      <map-chart
        :chart-style="{ height: '15rem' }"
        :chart-option="chartOption"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  apiGetEducationCount,
  apiGetEducationTrend,
  apiGetEducationGeneral,
} from '@/api/educationApi'

interface TrendItem {
  time: string,
  name: string,
  count: number
}

const trendData = ref([] as TrendItem[])
const studentCount = ref(0)
const currentType = ref('kinderGarden')
const generalData = ref([
  { key: 'kinderGarden', name: '幼儿园', count: 0 },
  { key: 'primarySchool', name: '小学', count: 0 },
  { key: 'middleSchool', name: '初中', count: 0 },
  { key: 'highSchool', name: '高中', count: 0 },
  { key: 'college', name: '大学', count: 0 }
])

const getEducationGeneral = async() => {
  const { data } = await apiGetEducationGeneral()
  generalData.value.forEach(item => {
    item.count = data[item.key]
  })
}

const getEducationCount = async(type: string) => {
  const { data } = await apiGetEducationCount(type)
  studentCount.value = data
}

const getEducationTrend = async(type: string) => {
  const { data } = await apiGetEducationTrend(type)
  trendData.value = data
}

const toggleType = (key: string) => {
  currentType.value = key
}

const iconSrc = (key: string) => {
  return new URL(`../../assets/images/${key}-icon.png`, import.meta.url).href
}

const currentName = computed(() => {
  const currentItem = generalData.value.find(item => item.key === currentType.value)
  return currentItem && currentItem.name
})

const chartOption = computed(() => {
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


watch(
  () => currentType.value,
  (val) => {
    getEducationCount(val)
    getEducationTrend(val)
  }
)

getEducationCount(currentType.value)
getEducationTrend(currentType.value)
getEducationGeneral()

</script>

<style lang="scss" scoped>
  .general-box {
    @include flex-column;
    &-item {
      @include flex-row;
      @include flex-align-center;
      margin-bottom: .75rem /* 12/16 */;
      padding: 0 .75rem /* 12/16 */;
      height: 2.75rem /* 44/16 */;
      background: rgba(79, 158, 253, .04);
      border-radius: .125rem /* 2/16 */;
      border: 1px solid rgba(79, 158, 253, .3);
      font-weight: bold;
      color: $defaultTextColor;
      cursor: pointer;
      img {
        margin-right: .75rem /* 12/16 */;
        width: 1.75rem /* 28/16 */;
        height: 1.75rem /* 28/16 */;
      }
      &.active {
        background: linear-gradient(90deg, rgba(79,158,253,0.3) 0%, rgba(79,158,253,0.04) 100%);
      }
    }
    &-count {
      font-size: 1.375rem /* 22/16 */;
      color: #4F9EFD;
    }
  }
  .education-count {
    @include flex-column;
    @include flex-center;
    margin: .75rem /* 12/16 */ 1.25rem /* 20/16 */ 1.125rem /* 18/16 */;
    height: 5rem /* 80/16 */;
    border-radius: .125rem /* 2/16 */;
    background: linear-gradient(135deg, rgba(0,233,234,0.28) 0%, rgba(0,233,234,0.04) 100%);
    font-weight: bold;
    .count {
      font-size: 1.375rem /* 22/16 */;
      color: #00E9EA;
    }
    .name {
      color: $defaultTextColor;
    }
  }
</style>
