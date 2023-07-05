<template>
  <div class="noro">
    <div class="noro-desc">
      诺如病毒，又称诺瓦克病毒（Norwalk Viruses, NV [1] ）是人类杯状病毒科（Human Calicivirus, HuCV）中诺如病毒（Norovirus, NV）属的一种病毒。是一组形态相似、抗原性略有不同的病毒颗粒。
      诺如病毒感染性腹泻在全世界范围内均有流行，全年均可发生感染，感染对象主要是成人和学龄儿童，寒冷季节呈现高发。美国每年在所有的非细菌性腹泻爆发中，60%-90%是由诺如病毒引起。荷兰、英国、日本、澳大利亚等发达国家也都有类似结果。在中国5岁以下腹泻儿童中，诺如病毒检出率为15%左右，血清抗体水平调查表明中国人群中诺如病毒的感染亦十分普遍.
    </div>

    <div class="noro-box">
      <div
        v-for="item in noroData"
        :key="item.name"
        class="noro-box-item">
        <span v-count:[item.count]="{ unit: '例' }" class="count" />
        <span v-html="item.name" class="title" />
      </div>
    </div>

    <span class="module-title">诺如病毒近半年感染者数量变化</span>
    <div class="noro-chart">
      <map-chart
        :chart-style="{ height: '15rem' }"
        :chart-option="chartOption"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { apiGetNoroCount, apiGetNoroTrend } from '@/api/preventionApi'

interface TrendItem {
  time: string,
  name: string,
  count: number
}

const noroData = ref([
  { name: '全国感染者', count: 0 },
  { name: '新增感染者', count: 0 }
])
const noroTrend = ref([] as TrendItem[])

const getNoroData = async() => {
  const { data } = await apiGetNoroCount()
  noroData.value = data
}

const getNoroTrend = async() => {
  const { data } = await apiGetNoroTrend()
  noroTrend.value = data
}

const chartOption = computed(() => {
  return {
    tooltip: { show: true },
    grid: { top: 10 },
    xAxis: {
      type: 'category',
      data: noroTrend.value.map(item => item.time)
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
      data: noroTrend.value.map(item => item.count),
      itemStyle: { color: '#6CFEFF' },
      barWidth: 30
    }]
  }
})

getNoroData()
getNoroTrend()

</script>

<style lang="scss" scoped>
.noro {
  &-desc {
    margin-bottom: .75rem /* 12/16 */;
    padding: .375rem /* 6/16 */;
    border: .0625rem /* 1/16 */ solid rgba($color: #4F9EFD, $alpha: .3);
    background: rgba(79, 158, 253, 0.10);
    border-radius: .125rem /* 2/16 */;
    color: $defaultTextColor;
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
