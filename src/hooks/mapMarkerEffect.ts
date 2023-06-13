import { watch } from 'vue'
import { mapMarkerStore } from "@/store/mapMarker"
declare let AMap: any

export function mapMarkerEffect (mapInstance: any) {
  const mapMarker = mapMarkerStore()

  watch(
    () => mapMarker.markers,
    (val: any[], oldVal: any[]) => {
      if (val.length > oldVal.length) {
        addMarkers(val)
      } else {
        const removeMarkersData = getRemoveMarkers(val, oldVal)
        removeMarkers(removeMarkersData as any[])
      }
    }
  )

  // 获取移除的点标记
  const getRemoveMarkers = (newMarkers: any[], oldMarkers: any[]) => {
    if(newMarkers.length === 0) {
      return oldMarkers
    } else {
      const latestMarkerName = newMarkers.map(item => item._opts.name)
      return oldMarkers.filter(item => !latestMarkerName.includes(item._opts.name))
    }
  }

  // 地图添加点标记
  const addMarkers = (addMarkers: any[]) => {
    mapInstance.value.add(addMarkers)
  }

  // 地图移除点标记
  const removeMarkers = (removeMarkers: any[]) => {
    mapInstance.value.remove(removeMarkers)
  }
}