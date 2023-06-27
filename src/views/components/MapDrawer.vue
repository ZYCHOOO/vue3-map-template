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
        class-name="touchable close-icon"
        @icon-click="openFlag = false"
      />
      <el-tree
        show-checkbox
        node-key="id"
        :props="treeProps"
        :data="treeData"
        :render-content="renderContent"
        @check-change="checkChange"
      />
    </border-box13>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { Tree, MarkerItem } from './type'
import { mapMarkerStore } from '@/store/mapMarker'
import { ref, defineComponent, watch } from 'vue'
import { BorderBox13 } from '@kjgl77/datav-vue3'
import { apiGetTree, apiGetMarkers } from '@/api/mapApi'
import SvgIcon from '@/components/SvgIcon/index.vue'
import type Node from 'element-plus/es/components/tree/src/model/node'

export default defineComponent({
  name: 'MapDrawer',
  components: { BorderBox13 },
  setup() {
    const route = useRoute()
    const treeData = ref()
    const treeProps = ref()
    const openFlag = ref(false)
    const mapMarker = mapMarkerStore()

    const showMapDrawer = (e:Event) => {
      console.log(e)
      openFlag.value = true
    }

    watch(
      () => route.path,
      (val: string) => {
        getTreeData(val.replace('/', ''))
        mapMarker.clearMarkers()
      }
    )
    
    const getTreeData = (path: string) => {
      apiGetTree({ type: path }).then(res => {
        treeData.value = res.data
      })
    }

    const renderContent = (h: any, { node, data }: { node: Node, data: Tree } ) => {
      return h(
        'div', { class: 'custom-tree-node' },
        h(SvgIcon, { icon: data.icon }),
        h('span', null, node.label)
      )
    }

    const checkChange = async (data: Tree, checked: boolean) => {
      if (checked) {
        const result = await apiGetMarkers(data.url)
        const markerData = result.data.map((item: MarkerItem) => ({
          ...item,
          icon: `${data.icon}-icon`,
          origin: data.type
        }))
        mapMarker.setMarkers(markerData)
      } else {
        mapMarker.clearMarkers(data.type)
      }
    }

    getTreeData(route.path.replace('/', ''))

    return {
      treeData,
      treeProps,
      openFlag,
      showMapDrawer,
      renderContent,
      checkChange
    }
  },

})

</script>

<style lang="scss" scoped>
  .map-drawer {
    position: absolute;
    top: 10rem /* 160/16 */;
    left: calc(#{$moduleWidth} + 3.75rem /* 60/16 */);
    &-trigger {
      width: 3.4375rem /* 55/16 */;
      height: 3.4375rem /* 55/16 */;
      background-image: url('@/assets/images/map-drawer.png');
      background-repeat: no-repeat;
      background-size: contain;
      z-index: 12;
    }
    &-content {
      position: absolute !important;
      width: 18.75rem /* 300/16 */;
      height: 31.25rem /* 500/16 */;
      background: $defaultBgColor;
      z-index: 12;

      :deep .svg-icon.close-icon {
        position: absolute;
        right: 0;
        top: 0;
        color: #FFF;
      }

      .el-tree {
        position: absolute;
        top: 1.25rem /* 20/16 */;
        padding: .625rem /* 10/16 */;
        width: calc(100% - 1.25rem /* 20/16 */);
        background: transparent;
        :deep .el-tree-node__expand-icon.is-leaf {
          display: none;
        }
        :deep .el-tree-node__content {
          padding-left: .625rem /* 10/16 */ !important;
          height: 1.5rem /* 24/16 */;
          background: transparent !important;

          .el-checkbox {
            margin-right: .375rem /* 6/16 */;
            width: 1.125rem /* 18/16 */;
            height: 1.125rem /* 18/16 */;
          }
          .el-checkbox__inner {
            width: 1.125rem /* 18/16 */;
            height: 1.125rem /* 18/16 */;
            border-radius: .125rem /* 2/16 */;
            background: transparent;
            border-color: #4F9EFD;
            border-width: .125rem /* 2/16 */;
            transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .1s cubic-bezier(.71,-.46,.29,1.46),outline .1s cubic-bezier(.71,-.46,.29,1.46);
            &::after {
              transition: none;
            }
          }
          .el-checkbox__input.is-checked {
            .el-checkbox__inner {
              background: #4F9EFD;
              &::after {
                left: .25rem /* 4/16 */;
                height: .625rem /* 10/16 */;
                width: .375rem /* 6/16 */;
                border-width: .125rem /* 2/16 */;
              }
            }
          }
          &:hover {
            background: transparent;
          }
        }
        :deep .custom-tree-node {
          @include flex-align-center;
          .svg-icon {
            margin-right: .375rem /* 6/16 */;
            width: 1rem /* 16/16 */;
            height: 1rem /* 16/16 */;
          }
          span {
            font-size: .875rem /* 14/16 */;
            font-weight: bold;
            color: $defaultTitleColor;
          }
        }
      }
    }
  }
</style>
