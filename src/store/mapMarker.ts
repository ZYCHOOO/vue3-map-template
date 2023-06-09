import { ref } from 'vue'
import { defineStore } from 'pinia'

interface MarkerItem {
  longitude: number | string,
  latitude: number | string,
  name: string,
  origin: string,
  type: string
  icon?: string
}

export const mapMarkerStore = defineStore('mapMarker', () => {

  const markers = ref([] as MarkerItem[])

  const setMarkers = (markersData: MarkerItem[]) => {
    markers.value = [...markers.value, ...markersData]
  }

  const clearMarkers = (origin?: string) => {
    markers.value = origin
      ? markers.value.filter(item => item.origin !== origin)
      : []
  }

  return {
    markers,
    setMarkers,
    clearMarkers
  }
})