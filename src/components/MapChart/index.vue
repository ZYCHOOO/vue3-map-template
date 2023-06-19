<template>
  <div :id="echartId" :style="chartStyle" />
</template>

<script lang="ts">
import * as echarts from 'echarts'
import { ref, onBeforeMount, onMounted, defineComponent, watch } from 'vue'

export default defineComponent({
  name: 'MapChart',
  props: {
    chartStyle: { type: Object },
    chartOption: { type: Object, required: true }
  },

  setup(props, _ctx) {
    const echartId = ref('')

    const drawChart = () => {
      const echart = echarts.init(document.getElementById(echartId.value) as HTMLElement)
      echart.setOption(props.chartOption, {
        notMerge: true // 不和之前的 option 合并
      })
      window.addEventListener('resize', () => {
        echart.resize({
          animation: { duration: 300 }
        })
      })
    }

    watch(
      () => props.chartOption,
      () => {
        drawChart()
      },
      { deep: true }
    )

    onBeforeMount(() => {
      echartId.value = `echarts-id-${parseInt((Math.random() * 1000).toString())}`
    })

    onMounted(() => {
      drawChart()
    })

    return {
      echartId
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
