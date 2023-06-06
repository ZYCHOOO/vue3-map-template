<template>
  <div class="map-drawer">
    <div
      v-if="!openFlag"
      class="map-drawer-trigger touchable"
      @click="showMapDrawer"
    />
    <border-box13
      v-if="openFlag"
      class="map-drawer-content"
    >
      <svg-icon
        icon="close"
        class-name="touchable"
        @icon-click="openFlag = false"
      />
    </border-box13>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { BorderBox13 } from '@kjgl77/datav-vue3'

export default defineComponent({
  name: 'MapDrawer',
  components: {
    BorderBox13
  },
  setup() {
    const openFlag = ref(false)

    const showMapDrawer = (e:Event) => {
      console.log(e)
      openFlag.value = true
    }

    return {
      openFlag,
      showMapDrawer
    }
  },

})

</script>

<style lang="scss" scoped>
  .map-drawer {
    position: absolute;
    top: 160px;
    left: calc(#{$moduleWidth} + 60px);
    &-trigger {
      width: 55px;
      height: 55px;
      background-image: url('@/assets/images/map-drawer.png');
      background-repeat: no-repeat;
      background-size: contain;
      z-index: 12;
    }
    &-content {
      position: absolute !important;
      width: 300px;
      height: 500px;
      background: $defaultBgColor;
      z-index: 12;

      :deep .svg-icon {
        position: absolute;
        right: 0;
        top: 0;
        color: #FFF;
      }
    }
  }
</style>
