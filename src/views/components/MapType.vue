<template>
  <div
    :class="['map-type', 'touchable', expandFlag ? 'expand' : 'collapse']"
    @click="expandFlag = true"
    v-click-outside="collapseMapType"
  >
    <svg-icon icon="mapType" class-name="map-type-svg" />
    
    <div
      v-for="item in mapTypes"
      :key="item.id"
      class="map-type-item"
      @click="toggleMapType(item.value)"
    >
      <svg-icon :icon="item.icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { MAP_TYPES } from '@/constant/enums'
import { mapTypeStore } from '@/store/mapType'

export default defineComponent({
  name: 'MapType',
  setup() {
    const expandFlag = ref(false)
    const mapTypes = ref(MAP_TYPES)
    
    const toggleMapType = (mapType: string) => {
      mapTypeStore().toggleMapType(mapType)
    }

    const collapseMapType = () => {
      if (expandFlag.value) {
        expandFlag.value = !expandFlag.value
      }
    }

    return {
      expandFlag,
      mapTypes,
      toggleMapType,
      collapseMapType
    }
  }
})

</script>

<style lang="scss" scoped>
  .map-type {
    @include flex-row;
    @include flex-center;
    position: absolute;
    top: 43.75rem /* 700/16 */;
    left: calc(#{$moduleWidth} + 3.75rem /* 60/16 */);
    width: 2.375rem /* 38/16 */;
    height: 2.375rem /* 38/16 */;
    background: rgba(0, 21, 62, .7);
    box-shadow: 0px 3px 6px 1px rgba(46, 116, 227, .5);
    border-radius: 2px 2px 2px 2px;
    border: 1px solid #4F9EFD;
    color: #4F9EFD;
    z-index: 12;
    transition: width .5s ease;
    &.expand {
      width: 5rem /* 80/16 */;
      :deep .map-type-svg {
        display: none !important;
      }
    }
    &.collapse {
      .map-type-item {
        display: none;
      }
    }
    &-item {
      @include flex-center;
      width: 2.375rem /* 38/16 */;
      height: 100%;
      color: #4F9EFD;
    }
  }

</style>
