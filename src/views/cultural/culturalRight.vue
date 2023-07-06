<template>
  <div class="cultural-right">
    <div class="hotel-box">
      <div
        v-for="item in countData"
        :key="item.id"
        class="hotel-box-item"
      >
        <span v-count="{ count: item.count, unit: item.unitName }" class="hotel-count"></span>
        <span class="hotel-name">{{ item.name }}</span>
      </div>
    </div>

    <span class="module-title">近半年酒店入住人数</span>
    <div class="trend-chart">
      <map-chart
        :chart-style="{ height: '16rem'}"
        :chart-option="chartOption"
      />
    </div>

    <span class="module-title">TOP10酒店排行</span>
    <rank-column :rank-data="hotelData" max-height="16.2rem" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { apiGetHotelCount, apiGetHotelTrend, apiGetHotelRank } from '@/api/culturalApi'

interface TrendItem {
  time: string,
  name: string,
  count: number
}

interface HotelItem {
  id: number,
  name: string,
  longitude: number,
  latitude: number
}

const countData = ref([
  { id: 1, name: '星级酒店数量', count: 0, unitName: '家', key: 'total' },
  { id: 2, name: '星级酒店营收', count: 0, unitName: '亿', key: 'income' },
  { id: 3, name: '星级酒店平均房价', count: 0, unitName: '元', key: 'average' }
])
const trendData = ref([] as TrendItem[])
const hotelData = ref([] as HotelItem[])

const getCountData = async() => {
  const { data } = await apiGetHotelCount()
  countData.value.forEach(item => {
    item.count = data[item.key]
  })
}

const getTrendData = async() => {
  const { data } = await apiGetHotelTrend()
  trendData.value = data
}

const getHotelRank = async() => {
  const { data } = await apiGetHotelRank()
  hotelData.value = data
}

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

getCountData()
getTrendData()
getHotelRank()

</script>

<style lang="scss" scoped>
  .hotel-box {
    @include flex-row;
    margin-bottom: .625rem /* 10/16 */;
    justify-content: space-around;
    &-item {
      padding: .75rem /* 12/16 */;
      @include flex-column;
      @include flex-center;
      height: 5rem /* 80/16 */;
      background: linear-gradient(135deg, rgba(0,233,234,0.28) 0%, rgba(0,233,234,0.04) 100%);
      .hotel-name {
        color: $defaultTextColor;
      }
      .hotel-count {
        font-size: 1.875rem /* 30/16 */;
        font-family: Din Alternate;
        color: #00E9EA;
      }
    }
  }
</style>
