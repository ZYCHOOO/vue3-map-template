<template>
  <div class="map-btn" @click="btnClick">
    <svg-icon v-if="prefixIcon" :icon="prefixIcon" />
    <span class="map-btn-text">{{ text }}</span>
    <svg-icon v-if="suffixIcon" :icon="suffixIcon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MapBtn',
  props: {
    text: { type: String, default: '' },
    prefixIcon: { type: String, default: '' },
    suffixIcon: { type: String, default: ''}
  },
  setup(_props, { emit }) {
    const btnClick = () => {
      emit('btn-click')
    }

    return { btnClick }
  }
})
</script>

<style lang="scss" scoped>
.map-btn {}
</style>