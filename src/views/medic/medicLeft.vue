<template>
  <div class="medic-left">
    <div class="medic-left-title">
      总参保人数：
      <span v-count="{ count: total, unit: '人' }" />
    </div>

    <div
      v-for="item in insureData"
      :key="item.id"
      class="insure-item"
      :class="['insure-item', item.key]"
    >
      <span class="insure-item-title">{{ item.name }}</span>
      <span v-count="{ count: item.count, unit: '人'}" class="insure-item-count ml-auto" />
    </div>

    <div class="type-chart">
      <map-chart
        :chart-style="{ height: '15rem' }"
        :chart-option="typeChartOption"
      />
    </div>

    <div class="source-chart">
      <map-chart
        :chart-style="{ height: '15rem' }"
        :chart-option="sourceChartOption"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { apiGetMedicCount } from '@/api/medicApi'

const total = ref(0)
const insureData = ref([
  { id: 1, name: '职工医保', key: 'workers', count: 0 },
  { id: 2, name: '居民医保', key: 'resident', count: 0 },
  { id: 3, name: '生育保险', key: 'birth', count: 0 }
])
const typeChartData = ref([
  { name: '在职', value: 0, key: 'onJob' },
  { name: '退休', value: 0, key: 'retire' }
])
const sourceChartData = ref([
  { name: '老年人', value: 0, key: 'old' },
  { name: '非从业人员', value: 0, key: 'nonEmployed' },
  { name: '学生', value: 0, key: 'student' }
])

const getMedicCount = () => {
  apiGetMedicCount().then(res => {
    const resultData = res.data
    total.value = resultData.total
    setInsureData(res.data)
    setTypeChartData(res.data)
    setSourceChartData(res.data)
  })
}

// 处理医保数据
const setInsureData = (data: any) => {
  insureData.value.forEach(item => {
    item.count = data[item.key]
  })
}

// 处理在职/离职饼图数据
const setTypeChartData = (data: any) => {
  typeChartData.value.forEach(item => {
    item.value = data[item.key]
  })
}

// 处理老年人/非从业人员/学生饼图数据
const setSourceChartData = (data: any) => {
  sourceChartData.value.forEach(item => {
    item.value = data[item.key]
  })
}

const typeChartOption = computed(() => {
  return {
    tooltip: { show: true },
    legend: {
      orient: 'vertical',
      right: '10%',
      top: '42%',
      itemWidth: 10,
      itemHeight: 10,
      icon: 'circle',
      textStyle: {
        fontSize: 14,
        color: '#A0B2D3',
        padding: [0,2, 0, 2],
      }
    },
    series: [{
      type: 'pie',
      width: 300,
      radius: ["66%", "50%"],
      label: {
        fontSize: 8,
        color: '#A0B2D3'
      },
      data: typeChartData.value
    }]
  }
})

const sourceChartOption = computed(() => {
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
      data: sourceChartData.value
    }]
  }
  return option
})

getMedicCount()

</script>

<style lang="scss" scoped>
  .medic-left {
    &-title {
      @include flex-row;
      @include flex-align-center;
      margin-bottom: 1.125rem /* 18/16 */;
      padding: 0 1.125rem /* 18/16 */;
      height: 2.5rem /* 40/16 */;
      background: linear-gradient(90deg, rgba(79,158,253,0.3) 0%, rgba(79,158,253,0.04) 100%);
      span {
        font-size: 1.375rem /* 22/16 */;
        font-family: Din Alternate;
        color: $defaultTextColor;
      }
    }
    .insure-item {
      @include flex-row;
      @include flex-align-center;
      margin-bottom: .875rem /* 14/16 */;
      padding: 0 1.375rem /* 22/16 */;
      height: 2.875rem /* 46/16 */;
      &-title {
        font-size: .875rem /* 14/16 */;
        color: $defaultTextColor;
      }
      &-count {
        font-family: Din Alternate;
        font-size: 1.875rem /* 30/16 */;
        font-weight: bold;
      }
      &.workers {
        background: linear-gradient(90deg,rgba(79,158,253,.2),rgba(79,158,253,.03));
        .insure-item-count {
          color: #FF913F;
        }
      }
      &.resident {
        background: linear-gradient(90deg,rgba(0,234,156,.2),rgba(0,234,156,.03));
        .insure-item-count {
          color: #4F9EFD;
        }
      }
      &.birth {
        background: linear-gradient(90deg,rgba(255,146,63,.2),rgba(255,146,63,.03));
        .insure-item-count {
          color: #00E9EA;
        }
      }
    }
  }
</style>
