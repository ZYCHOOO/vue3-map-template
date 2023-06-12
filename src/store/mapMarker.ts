import { ref } from 'vue'
import { defineStore } from 'pinia'
declare let AMap: any

interface MarkerItem {
  longitude: number | string,
  latitude: number | string,
  name: string,
  origin: string,
  type: string
  icon?: string
}

export const mapMarkerStore = defineStore('mapMarker', () => {

  const markers = ref([] as any[])

  const setMarkers = (originMarkers: MarkerItem[]) => {
    let markersData = [] as any[]
    originMarkers.forEach((item: MarkerItem) => {
      const marker = new AMap.Marker({
        ...item,
        position: new AMap.LngLat(item.longitude, item.latitude)
      })
      markersData.push(marker)
    })
    markers.value = [...markers.value, ...markersData]
  }

  const clearMarkers = (origin?: string) => {
    markers.value = origin
      ? markers.value.filter(item => item._opts.origin !== origin)
      : []
  }

  return {
    markers,
    setMarkers,
    clearMarkers
  }
})