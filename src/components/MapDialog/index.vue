<template>
  <Teleport to="body">
    <div class="map-dialog-container">
      <transition name="dialog-fade">
        <div class="map-dialog-mask" v-if="modelValue" @click="closeDialog">
          <div class="map-dialog-overlay">
            <border-box11
              v-if="modelValue"
              :title="title"
              :title-width="style.titleWidth"
              :class="dialogClassName"
            >
              <svg-icon
                icon="close"
                class-name="touchable close-icon"
                @icon-click="closeDialog"
              />
              <div class="map-dialog-content">
                <component :is="currentComponent" />
              </div>
            </border-box11>
          </div>
        </div>
      </transition>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { BorderBox11 } from '@kjgl77/datav-vue3'
import { mapDialogStore } from '@/store/mapDialog'
import { defineComponent, computed, toRefs, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'MapDialog',
  components: { BorderBox11 },
  props: {
    modelValue: { type: Boolean, default: false }
  },
  setup(_props, { emit }) {

    const mapDialog = mapDialogStore()
    const { dialogInfo } = storeToRefs(mapDialog)

    
    const { title, style, componentName } = toRefs(dialogInfo.value)

    const dialogClassName = computed(() => {
      // return style!.className
      //   ? `map-dialog ${style!.className}`
      //   : 'map-dialog'
      return 'map-dialog'
    })

    const currentComponent = computed(() => {
      const component = componentName.value
      return defineAsyncComponent(() => import(/* @vite-ignore */`../DialogContent/${component}.vue`))
    })

    const closeDialog = () => {
      emit('update:modelValue', false)
    }

    return {
      title,
      style,
      dialogClassName,
      currentComponent,
      closeDialog
    }
  }
})

</script>

<style lang="scss" scoped>
  .map-dialog {
    margin: 15vh auto;
    width: 31.25rem /* 500/16 */ !important;
    height: 18.75rem /* 300/16 */ !important;
    background: $defaultBgColor;
    color: #FFF;
    &-overlay {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: auto;
    }
    &-mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2000;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      overflow: auto;
    }
    &-content {
      padding: 3.75rem /* 60/16 */ 1.25rem /* 20/16 */ 0;
      height: calc(100% - 70px);
    }
    :deep .svg-icon.close-icon {
      position: absolute;
      right: .5rem /* 8/16 */;
      top: .5rem /* 8/16 */;
      color: #FFF;
    }
  }
</style>
