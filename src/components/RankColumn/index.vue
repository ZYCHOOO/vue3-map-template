<template>
  <div class="rank-column" :style="{ '--maxHeight': maxHeight }">
    <div
      v-for="item in rankData"
      :key="item.id"
      class="rank-column-item touchable"
      @click="rowClick(item)">
      {{ item.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'

interface RankItem {
  id: number,
  name: string
}

export default defineComponent({
  name: 'RankColumn',
  props: {
    maxHeight: { type: String, default: '22.5rem' },
    rankData: { type: Array as PropType<RankItem[]> }
  },
  setup(_props, { emit }) {
    const rowClick = (item: RankItem) => {
      emit('row-click', item)
    }

    return { rowClick }
  }
})
</script>

<style lang="scss" scoped>

.rank-column {
  @include flex-column;
  margin-top: .75rem /* 12/16 */;
  max-height: var(--maxHeight);
  overflow: scroll;
  &-item {
    @include flex-align-center;
    margin-bottom: .75rem /* 12/16 */;
    padding: .75rem /* 12/16 */ .75rem /* 12/16 */;
    background: rgba(79,158,253,0.1);
    &:hover {
      background: rgba(76,111,165,0.8);
    }
    &::before {
      content: '';
      margin-right: .375rem /* 6/16 */;
      width: .5rem /* 8/16 */;
      height: .5rem /* 8/16 */;
      background: #00E9EA;
      border-radius: 50%;
    }
  }
}
</style>