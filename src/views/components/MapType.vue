<template>
  <div
    class="map-type collapse"
    :class="['map-type', expandFlag ? 'expand' : 'collapse']"
    @click="expandFlag = true"
    v-click-outside="test"
  >
    <svg-icon v-if="!expandFlag" icon="mapType" />
    <template v-else>
      <div
        v-for="item in mapTypes"
        :key="item.id"
        class="map-type-item"
        @click="toggleMapType(item.value)"
      >
        <svg-icon :icon="item.icon" />
      </div>
    </template>
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

    const test = () => {
      console.log('shit')
    }

    return {
      expandFlag,
      mapTypes,
      toggleMapType,
      test
    }
  }
})

</script>

<style lang="scss" scoped>
  .map-type {
    @include flex-row;
    position: absolute;
    top: 700px;
    left: calc(#{$moduleWidth} + 60px);
    width: 38px;
    height: 38px;
    background: rgba(0, 21, 62, .7);
    box-shadow: 0px 3px 6px 1px rgba(46, 116, 227, .5);
    border-radius: 2px 2px 2px 2px;
    border: 1px solid #4F9EFD;
    cursor: pointer;
    z-index: 12;
    transition: width .5s ease;
    &.expand {
      width: 80px;
    }
    &.collapse {
      @include flex-center;
    }
    &-item {
      @include flex-center;
      width: 38px;
      height: 100%;
      color: #4F9EFD;
    }
  }
</style>
