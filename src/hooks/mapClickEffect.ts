import { mapDialogStore } from "@/store/mapDialog"

// 地图点击方法
export function mapClickEffect (event: any) {
  // mapInstance.value.on('click', (event: any) => {
  //   console.log(event)
  // })
}

// 点标记点击方法
export function markerClickEffect (event: any) {
  const mapDialog = mapDialogStore()
  const { _originOpts: markerInfo } = event.target
  mapDialog.setDialogInfo(markerInfo)
  // console.log('marker-click', markerInfo)
}