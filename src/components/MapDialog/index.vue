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
                <!-- <component :is="currentComponent" /> -->
                {{ demoContent }}
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
import { defineComponent, computed, toRefs } from 'vue'

export default defineComponent({
  name: 'MapDialog',
  components: { BorderBox11 },
  props: {
    modelValue: { type: Boolean, default: false }
  },
  setup(_props, { emit }) {

    const mapDialog = mapDialogStore()
    const { dialogInfo } = storeToRefs(mapDialog)

    console.log(dialogInfo)

    const { title, style, demoContent } = toRefs(dialogInfo.value)

    const dialogClassName = computed(() => {
      // return style!.className
      //   ? `map-dialog ${style!.className}`
      //   : 'map-dialog'
      return 'map-dialog'
    })

    const currentComponent = computed(() => {
      // const modules = import.meta.glob(['../DialogContent/*.vue'])
      // return () => import(/* @vite-ignore */ '../DialogContent/' + componentName + '.vue')
      // return modules[`../DialogContent/${componentName}.vue`]
    })

    const closeDialog = () => {
      emit('update:modelValue', false)
    }

    return {
      title,
      style,
      demoContent,
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
    width: 500px;
    height: 300px;
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
      padding: 60px 20px 0;
      height: calc(100% - 70px);
    }
    :deep .svg-icon.close-icon {
      position: absolute;
      right: 8px;
      top: 8px;
      color: #FFF;
    }
  }
</style>
