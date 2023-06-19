<template>
  <div class="medic-left">
    <div class="medic-left-title">
      总参保人数：
      <!-- <span v-if="total" v-count:3000="{ unit: '人' }">{{ total }}</span> -->
      {{ total }}
    </div>

    <div class="insure-box">
      <div
        v-for="item in insureData"
        :key="item.id"
        class="insure-item"
        :class="['insure-item', item.key]"
      >
        <span>{{ item.name }}</span>
        <span>{{ item.count }}</span>
      </div>
    </div>

    <div class="type-chart">
      <map-chart
        :chart-style="{ height: '300px' }"
        :chart-option="typeChartOption"
      />
    </div>

    <div class="source-chart">
      <map-chart
        :chart-style="{ height: '300px' }"
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
    console.log(res)
    const resultData = res.data
    total.value = resultData.total
    setInsureData(res.data)
    setTypeChartData(res.data)
    setSourceChartData(res.data)
  })
}

const setInsureData = (data: any) => {
  insureData.value.forEach(item => {
    item.count = data[item.key]
  })
}

const setTypeChartData = (data: any) => {
  typeChartData.value.forEach(item => {
    item.value = data[item.key]
  })
}

const setSourceChartData = (data: any) => {
  sourceChartData.value.forEach(item => {
    item.value = data[item.key]
  })
  console.log(sourceChartData.value)
}

const typeChartOption = computed(() => {
  return {
    tooltip: {
      show: true
    },
    series: [{
      type: 'pie',
      radius: ["66%", "55%"],
      data: typeChartData.value
    }]
  }
})

const sourceChartOption = computed(() => {
  const option = {
    tooltip: {
      show: true
    },
    series: [{
      type: 'pie',
      radius: ["66%", "55%"],
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
      background: linear-gradient(90deg,#1b3e69,#122b4e);
    }
    .insure-box {
      @include flex-row;
      margin-top: 30px;
      .insure-item {
        @include flex-column;
        width: 30%;
        &.workers {
          background: linear-gradient(90deg,rgba(79,158,253,.2),rgba(79,158,253,.03));
        }
        &.resident {
          background: linear-gradient(90deg,rgba(0,234,156,.2),rgba(0,234,156,.03));
        }
        &.birth {
          background: linear-gradient(90deg,rgba(255,146,63,.2),rgba(255,146,63,.03));
        }
      }
    }
  }
</style>
