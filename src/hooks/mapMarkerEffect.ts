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

  const getRemoveMarkers = (newMarkers: any[], oldMarkers: any[]) => {
    if(newMarkers.length === 0) {
      return oldMarkers
    } else {

    }
  }

  const addMarkers = (addMarkers: any[]) => {
    mapInstance.value.add(addMarkers)
  }

  const removeMarkers = (removeMarkers: any[]) => {
    mapInstance.value.remove(removeMarkers)
  }
}