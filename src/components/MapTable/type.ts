export interface ColumnItem {
  // 字段名称
  prop?: string,
  // 表头
  label: string,
  // 列宽度
  width?: string | number,
  // 对齐方式
  align?: 'left' | 'center' | 'right',
  // 自定义列表模版名称
  slot?: string,
  // 是否操作箱
  action?: boolean,
  // 是否是可编辑
  editable?: boolean
}