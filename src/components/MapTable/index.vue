<template>
  <el-table
    :data="data"
    v-bind="$attrs"
    class="z-table"
    v-loading="loading"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-background="elementLoadingBackground"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-svg-view-box="elementLoadingViewBox"
  >
    <template v-for="item in tableColumns" :key="item.prop">
      <el-table-column
         v-if="!item.action"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
        :width="item.width"
      >
        <template #header="scope">
          <slot v-if="item.slot" :name="`header-${item.slot}`" :label="scope.column.label" />
          <span v-else>{{ scope.column.label }}</span>
        </template>
        <template #default="scope">
          <!-- 常规/自定义 单元格 -->
          <slot v-if="item.slot" :name="item.slot" :scope="scope" />
          <span v-else>{{ scope.row[item.prop!] }}</span>
        </template>
      </el-table-column>
      <!-- 自定义列 -->
      <el-table-column
        v-else
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">
          <slot :name="item.slot" :scope="scope" />
        </template>
      </el-table-column>
    </template>

    <!-- 操作项 -->
    <el-table-column
      :label="actionColumn!.label"
      :align="actionColumn!.align"
      :width="actionColumn!.width"
    >
      <template #default="scope">
        <slot name="action" :scope="scope" />
      </template>
    </el-table-column>
  </el-table>
  <div v-if="pagination && !loading" class="pagination" :style="{ justifyContent }">
    <el-pagination
      :modalValue="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue'
import { ColumnItem } from './type'

export default defineComponent({
  name: 'MapTable',
  props: {
    columns: {
      type: Array as PropType<ColumnItem[]>,
      required: true
    },
    data: {
      type: Array as PropType<any[]>,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    // 加载的文案
    elementLoadingText: { type: String },
    // 加载的图标名
    elementLoadingSpinner: { type: String },
    // 加载背景颜色
    elementLoadingBackground: { type: String },
    // 加载 svg
    elementLoadingSvg: { type: String },
    // 加载 svg 的配置
    elementLoadingViewBox: { type: String },
    // 编辑图标
    editIcon: {
      type: String,
      default: 'Edit'
    },
    // 是否展示分页
    pagination: {
      type: Boolean,
      default: false
    },
      // 显示分页的对齐方式
    paginationAlign: {
      type: String as PropType<'left' | 'center' | 'right'>,
      default: 'left'
    },
    // 当前是第几页
    currentPage: {
      type: Number,
      default: 1
    },
    // 当前一页多少条数据
    pageSize: {
      type: Number,
      default: 10
    },
    // 显示分页数据多少条的选项
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40]
    },
    // 数据总条数
    total: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {

    // 过滤操作项以外的配置
    const tableColumns = computed(() => props.columns.filter(item => !item.action))

    // 操作项配置
    const actionColumn = computed(() => props.columns.find(item => item.action))

    // 表格分页的排列方式
    const justifyContent = computed(() => {
      if (props.paginationAlign === 'left') return 'flex-start'
      else if (props.paginationAlign === 'right') return 'flex-end'
      else return 'center'
    })

    // 分页的每一页数据变化
    let handleSizeChange = (val: number) => {
      emit('size-change', val)
      // console.log(val)
    }
    // 分页页数改变
    let handleCurrentChange = (val: number) => {
      emit('current-change', val)
      // console.log(val)
    }

    return {
      tableColumns,
      actionColumn,
      justifyContent,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style lang="scss" scoped>

.pagination {
  @include flex-row;
  margin-top: 10px;
}
</style>
