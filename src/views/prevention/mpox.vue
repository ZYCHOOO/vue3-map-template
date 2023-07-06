<template>
  <div class="mpox">
    <div class="mpox-desc">
      猴痘是一种病毒性人畜共患病，人类中出现的症状与过去在天花患者身上所看到的症状相似。但是自1980年世界上消灭天花以后，天花已不复存在，而猴痘仍然在非洲部分地区散发。
      猴痘发生于非洲中西部雨林中的猴类，也可感染其他动物，偶可使人类受感染。临床表现类似天花，但病情较轻。这种疾病由猴痘病毒造成，它属于一个包括天花病毒，并在天花疫苗中采用的病毒和牛痘病毒的病毒组，但需与天花、水痘相鉴别。这种病毒可以通过直接密切接触由动物传染给人，也可以在人与人之间传播。传染途径主要包括血液和体液。但是，猴痘的传染性远逊于天花病毒.
    </div>

    <div class="mpox-data">
      <img src="@/assets/images/virus-icon.png" alt="">
      猴痘患者数量
      <span v-count="{ count: mpoxCount, unit: '人' }" class="ml-auto" />
    </div>

    <span class="module-title">猴痘患病性别比例</span>
    <div class="ratio-chart">
      <map-chart
        :chart-style="{ height: '16rem' }"
        :chart-option="chartOption"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { apiGetMpoxRatio, apiGetMpoxCount } from '@/api/preventionApi'

const mpoxCount = ref(0)
const ratioData = ref([
  { name: '男性患者', value: 0, key: 'male' },
  { name: '女性患者', value: 0, key: 'female' }
])

const getMpoxCount = async() => {
  const { data } = await apiGetMpoxCount()
  mpoxCount.value = data
}

const getMpoxRatio = async() => {
  const { data } = await apiGetMpoxRatio()
  ratioData.value.forEach(item => {
    item.value = data[item.key]
  })
}

const chartOption = computed(() => {
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

getMpoxRatio()
getMpoxCount()

</script>

<style lang="scss" scoped>
.mpox {
  &-desc {
    margin-bottom: .75rem /* 12/16 */;
    padding: .375rem /* 6/16 */;
    border: .0625rem /* 1/16 */ solid rgba($color: #4F9EFD, $alpha: .3);
    background: rgba(79, 158, 253, 0.10);
    border-radius: .125rem /* 2/16 */;
    color: $defaultTextColor;
  }
  &-data {
    @include flex-row;
    @include flex-align-center;
    margin-bottom: 1rem /* 16/16 */;
    padding: 0 1.25rem /* 20/16 */;
    height: 3.5rem /* 56/16 */;
    background-image: url(@/assets/images/item-bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: $defaultTextColor;
    img {
      margin-right: 1.125rem /* 18/16 */;
      width: 1.75rem /* 28/16 */;
    }
    span:nth-child(2) {
      font-size: 1.375rem /* 22/16 */;
      font-family: Din Alternate;
      color: #4F9EFD;
    }
  }
}
</style>
