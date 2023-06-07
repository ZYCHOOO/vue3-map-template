import { watch } from 'vue'
import { mapMarkerStore } from "@/store/mapMarker"
declare let AMap: any

export function mapMarkerEffect (mapInstance: any) {
  const mapMarker = mapMarkerStore()

  watch(
    () => mapMarker.markers,
    (val: any) => {
      setMarkers(val)
    }
  )

  const setMarkers = (val: any[]) => {
    let markers = [] as any[]
    val.forEach((item) => {
      const marker = new AMap.Marker({
        position: new AMap.LngLat(item.longitude, item.latitude)
      })
      markers.push(marker)
    })
    mapInstance.value.add(markers)
  }
}