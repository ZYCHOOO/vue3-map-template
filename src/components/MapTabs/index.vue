<template>
  <div class="map-tabs">
    <div
      v-for="tab in options"
      :key="tab.value"  
      :class="['map-tab', modelValue === tab.value ? 'active' : '']"
      :style="{ '--length': options && options.length }"
      @click="toggleTab(tab.value)"
    >
      {{ tab.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, onUnmounted } from 'vue'

interface OptionItem {
  value: string,
  label: string
}

export default defineComponent({
  name: 'MapTabs',
  props: {
    modelValue: { type: String },
    duration: { type: Number, default: 3000 },
    autoplay: { type: Boolean, default: false },
    options: { type: Array as PropType<OptionItem[]>, required: true }
  },
  setup(props, { emit }) {
    let num = 1
    let timer:NodeJS.Timer | null = null

    onMounted(() => {
      if (props.autoplay) {
        timer = setInterval(() => {
          gradualSetTab()
        }, props.duration)
      }
    })

    onUnmounted(() => {
      if (timer) {
        clearInterval(Number(timer))
      }
    })

    const toggleTab = (tabValue: string) => {
      emit('update:modelValue', tabValue)
    }

    const gradualSetTab = () => {
      num++
      const index = ( num % props.options.length)
      emit('update:modelValue', props.options[index].value)
    }

    return {
      toggleTab
    }
  }
})
</script>

<style lang="scss" scoped>
.map-tabs {
  @include flex-row;
  justify-content: space-around;
  .map-tab {
    @include flex-center;
    height: 1.875rem /* 30/16 */;
    width: calc(100% / var(--length) - 2%);
    background: rgba(79, 158, 253, .3);
    border-radius: .25rem /* 4/16 */;
    border: .0625rem /* 1/16 */ solid #4F9EFD;
    font-size: 1.125rem /* 18/16 */;
    color: $defaultTitleColor;
    cursor: pointer;
    &.active {
      background: linear-gradient(180deg, rgba(79,158,253,0.9) 0%, rgba(79,158,253,0.55) 49%, rgba(79,158,253,0.8) 100%);
    }
  }
}
</style>