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

    const showMapDrawer = (e:Event) => {
      console.log(e)
      openFlag.value = true
    }

    watch(
      () => route.path,
      (val: string) => {
        getTreeData(val.replace('/', ''))
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
      const mapMarker = mapMarkerStore()
      if (checked) {
        const result = await apiGetMarkers(data.url)
        const markerData = result.data.map((item: MarkerItem) => ({
          ...item,
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

      :deep .svg-icon.close-icon {
        position: absolute;
        right: 0;
        top: 0;
        color: #FFF;
      }

      .el-tree {
        position: absolute;
        top: 20px;
        padding: 10px;
        width: calc(100% - 20px);
        background: transparent;
        :deep .el-tree-node__expand-icon.is-leaf {
          display: none;
        }
        :deep .el-tree-node__content {
          padding-left: 10px !important;
          background: transparent !important;
          .el-checkbox__inner {
            background: transparent;
            border-color: #162D4C;
          }
          .el-checkbox__input.is-checked {
            .el-checkbox__inner {
              background: #4F9EFD;
              border-color: #162D4C;
            }
          }
          &:hover {
            background: transparent;
          }
        }
        :deep .custom-tree-node {
          span { color: #FFF }
        }
      }
    }
  }
</style>
